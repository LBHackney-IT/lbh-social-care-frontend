import * as Yup from 'yup';
import { FormikValues, FormikErrors } from 'formik';
import { Field } from 'data/flexibleForms/forms.types';
import { ObjectShape, OptionalObjectSchema, TypeOfShape } from 'yup/lib/object';
import { getTotalHours } from './utils';

export const startSchema = Yup.object().shape({
  socialCareId: Yup.number()
    .typeError('ID can only contain numbers')
    .integer('ID can only contain numbers')
    .required('You must provide an ID'),
  formId: Yup.string().required('Please choose a form'),
});

export const panelApproveSchema = Yup.object().shape({
  confirmed: Yup.boolean().oneOf(
    [true],
    'You must confirm the panel has reviewed this work'
  ),
});

export const generateSubmitSchema = (
  currentUserEmail: string
): OptionalObjectSchema<
  ObjectShape,
  Record<string, unknown>,
  TypeOfShape<ObjectShape>
> =>
  Yup.object().shape({
    approverEmail: Yup.string()
      .required('You must provide an email address')
      .matches(
        /hackney.gov.uk$/,
        'You must provide a valid Hackney Council email address'
      )
      .test(
        'is-not-self',
        `You can't approve your own submissions`,
        (value) => value !== currentUserEmail
      )
      .email('You must provide a valid Hackney Council email address'),
  });

export const rejectionSchema = Yup.object().shape({
  rejectionReason: Yup.string()
    .required('You must provide a reason')
    .min(10, 'The reason must be at least ten characters'),
});

const getErrorMessage = (field: Field) => {
  if (field.error) return field.error;
  if (field.type === `timetable`) return `Total hours must be more than zero`;
  if (field.type === `checkboxes`) return `Choose at least one item`;
  if (
    field.type === 'tags' ||
    field.type === 'repeater' ||
    field.type === `repeaterGroup`
  )
    return `Add at least one ${field.itemName || 'item'}`;
  return `This question is required`;
};

/** create a validation schema for a flexible form, ignoring conditional fields */
export const generateFlexibleSchema = (
  fields: Field[]
): OptionalObjectSchema<
  ObjectShape,
  Record<string, unknown>,
  TypeOfShape<ObjectShape>
> => {
  const shape: { [key: string]: Yup.AnySchema | Yup.ArraySchema<any> } = {};

  fields.map((field) => {
    if (field.type === 'repeaterGroup') {
      // recursively generate a schema for subfields of a repeater group
      shape[field.id] = Yup.array().of(
        generateFlexibleSchema(field.subfields || [])
      );
    } else if (field.type === 'timetable') {
      shape[field.id] = Yup.object();
    } else if (
      field.type === 'checkboxes' ||
      field.type === 'datetime' ||
      field.type === 'repeater' ||
      field.type === 'tags'
    ) {
      shape[field.id] = Yup.array().of(
        Yup.string().required(getErrorMessage(field))
      );
    } else {
      shape[field.id] = Yup.string();
    }

    // add a required attribute if a field is required and not conditional
    if (field.required) {
      if (field.type === 'timetable') {
        shape[field.id] = shape[field.id].test(
          'total',
          getErrorMessage(field),
          (value) => getTotalHours(value) !== 0
        );
      } else if (field.type === 'datetime') {
        shape[field.id] = (shape[field.id] as Yup.NumberSchema).min(
          2,
          getErrorMessage(field)
        );
      } else if (
        field.type === 'checkboxes' ||
        field.type === 'tags' ||
        field.type === 'repeater' ||
        field.type === 'repeaterGroup'
      ) {
        shape[field.id] = (shape[field.id] as Yup.NumberSchema).min(
          1,
          getErrorMessage(field)
        );
      } else {
        shape[field.id] = shape[field.id]
          .required(getErrorMessage(field))
          .when(Array.isArray(field.condition) ? '' : field.condition?.id, {
            is: (test: unknown) => console.log(test),
            then: Yup.string().required(getErrorMessage(field)),
          });
      }
    }
  });

  return Yup.object().shape(shape);
};

/** respect the "required" attribute for conditional fields, only when the condition is met */
export const validateConditionalFields = (
  values: FormikValues,
  fields: Field[]
): FormikErrors<FormikValues> => {
  const errors: FormikErrors<FormikValues> = {};
  fields.map((field) => {
    if (field.condition) {
      if (
        Array.isArray(field.condition)
          ? !field.condition.every((cond) => values[cond.id] === cond.value) &&
            field.required
          : values[field.condition.id] === field.condition.value &&
            field.required
      ) {
        if (field.type === 'timetable') {
          // handle timetable fields specially
          if (getTotalHours(values[field.id]) === 0)
            errors[field.id] = getErrorMessage(field);
        } else {
          if (!values[field.id]?.length)
            errors[field.id] = getErrorMessage(field);
        }
      }
    }
  });
  return errors;
};
