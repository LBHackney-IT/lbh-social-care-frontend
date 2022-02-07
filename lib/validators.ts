import * as Yup from 'yup';
import { Answer, Field } from 'data/flexibleForms/forms.types';
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

type Shape = { [key: string]: Yup.AnySchema | Yup.ArraySchema<any> };

const applyRequired = (field: Field, shape: Shape): Yup.AnySchema => {
  if (field.type === 'timetable') {
    return shape[field.id].test(
      'total',
      getErrorMessage(field),
      (value) => getTotalHours(value) !== 0
    );
  } else if (field.type === 'datetime') {
    return (shape[field.id] as Yup.NumberSchema).min(2, getErrorMessage(field));
  } else if (
    field.type === 'checkboxes' ||
    field.type === 'tags' ||
    field.type === 'repeater' ||
    field.type === 'repeaterGroup'
  ) {
    return (shape[field.id] as Yup.NumberSchema).min(1, getErrorMessage(field));
  } else {
    return shape[field.id].required(getErrorMessage(field));
  }
};

/** create a validation schema for a flexible form, ignoring conditional fields */
export const generateFlexibleSchema = (
  fields: Field[]
): OptionalObjectSchema<
  ObjectShape,
  Record<string, unknown>,
  TypeOfShape<ObjectShape>
> => {
  const shape: Shape = {};

  fields.map((field) => {
    if (field.type === 'repeaterGroup') {
      // recursively generate a schema for subfields of a repeater group
      shape[field.id] = Yup.array().of(
        generateFlexibleSchema(field.subfields || [])
      );
    } else if (field.type === 'timetable') {
      shape[field.id] = Yup.object();
    } else if (
      field.type === 'date' &&
      field.startDate &&
      field.isfutureDateValid === false
    ) {
      shape[field.id] = Yup.string().test(
        'Validate date is before date and past or present',
        'Date cannot be before start date or in the future',

        (dateValue) => {
          const dateTimeToValidate = new Date(String(dateValue));
          return (
            dateTimeToValidate >= new Date(String(field.startDate)) &&
            dateTimeToValidate <= new Date(Date.now())
          );
        }
      );
    } else if (field.type === 'date' && field.startDate) {
      shape[field.id] = Yup.string().test(
        'Validate date is future',
        'Date cannot be before start date',
        (dateValue) => {
          const dateTimeToValidate = new Date(String(dateValue));
          return dateTimeToValidate >= new Date(String(field.startDate));
        }
      );
    } else if (field.type === 'date' && field.isfutureDateValid === false) {
      shape[field.id] = Yup.string().test(
        'Validate date is present or past',
        'Date cannot be in the future',
        (dateValue) => {
          const dateTimeToValidate = new Date(String(dateValue));
          return dateTimeToValidate <= new Date(Date.now());
        }
      );
    } else if (field.type === 'datetime' && field.isfutureDateValid === false) {
      //for those cases that don't allow dates in the future
      shape[field.id] = Yup.array().test(
        'Validate date is present or past',
        'Date cannot be in the future',
        (dateValue) => {
          if (dateValue?.length !== 2) return false;

          const dateTimeFromForm: [string, string] = Array.from(dateValue) as [
            string,
            string
          ];

          const dateTimeToValidate = new Date(dateTimeFromForm[0]);
          const timeFromForm = dateTimeFromForm[1];
          // When no time is entered
          if (!timeFromForm) {
            return false;
          }
          const hours = Number(timeFromForm.slice(0, 2));
          const minutes = Number(timeFromForm.slice(3, 5));

          dateTimeToValidate.setHours(hours);
          dateTimeToValidate.setMinutes(minutes);

          return dateTimeToValidate <= new Date(Date.now());
        }
      );
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

    if (field.required) {
      if (field.conditions) {
        shape[field.id] = (shape[field.id] as Yup.StringSchema).when(
          field.conditions.map((c) => c.id),
          {
            is: (...valuesToTest: Answer[]) =>
              field.conditions?.every((condition, i) => {
                return valuesToTest[i] === condition.value;
              }),
            then: applyRequired(field, shape),
            otherwise: shape[field.id],
          }
        );
      } else {
        // handle basic required fields
        shape[field.id] = applyRequired(field, shape);
      }
    }
  });

  return Yup.object().shape(shape);
};
