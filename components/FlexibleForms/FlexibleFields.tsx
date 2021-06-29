import TextField from './TextField';
import RadioField from './RadioField';
import CheckboxField from './CheckboxField';
import SelectField from './SelectField';
import RepeaterField from './RepeaterField';
import RepeaterGroupField from './RepeaterGroupField';
import ComboboxField from './ComboboxField';
import { FormikValues, FormikTouched, FormikErrors } from 'formik';
import { Field } from 'data/flexibleForms/forms.types';
import TimetableField from './TimetableField';
import TagsField from './TagsField';
import caseNoteTags from 'data/caseNoteTags';

interface Props {
  values: FormikValues;
  field: Field;
  touched: FormikTouched<FormikValues>;
  errors: FormikErrors<FormikValues>;
}

const FlexibleField = ({
  values,
  field,
  touched,
  errors,
}: Props): React.ReactElement | null => {
  if (field.condition && values[field.condition.id] !== field.condition.value)
    return null;

  if (field.type === 'repeaterGroup' && field.subfields)
    return (
      <RepeaterGroupField
        name={field.id}
        subfields={field.subfields}
        label={field.question}
        {...field}
      />
    );

  if (field.type === 'textarea')
    return (
      <TextField
        name={field.id}
        label={field.question}
        touched={touched}
        errors={errors}
        as="textarea"
        rows={3}
        {...field}
      />
    );

  if (field.type === 'date')
    return (
      <TextField
        name={field.id}
        label={field.question}
        touched={touched}
        errors={errors}
        {...field}
      />
    );

  if (field.type === 'text')
    return (
      <TextField
        name={field.id}
        label={field.question}
        touched={touched}
        errors={errors}
        {...field}
      />
    );

  if (field.type === 'tags')
    return (
      <TagsField
        name={field.id}
        label={field.question}
        touched={touched}
        errors={errors}
        {...field}
      />
    );

  if (field.type === 'repeater')
    return (
      <RepeaterField
        name={field.id}
        label={field.question}
        touched={touched}
        errors={errors}
        {...field}
      />
    );

  if (field.type === 'checkboxes' && field.choices)
    return (
      <CheckboxField
        name={field.id}
        label={field.question}
        touched={touched}
        choices={field.choices}
        errors={errors}
        {...field}
      />
    );

  if (field.type === 'combobox' && field.choices)
    return (
      <ComboboxField
        name={field.id}
        label={field.question}
        touched={touched}
        choices={field.choices}
        errors={errors}
        {...field}
      />
    );

  if (field.type === 'select' && field.choices)
    return (
      <SelectField
        name={field.id}
        label={field.question}
        touched={touched}
        choices={field.choices}
        errors={errors}
        {...field}
      />
    );

  if (field.type === 'radios' && field.choices)
    return (
      <RadioField
        name={field.id}
        label={field.question}
        touched={touched}
        choices={field.choices}
        errors={errors}
        {...field}
      />
    );

  if (field.type === 'timetable')
    return <TimetableField name={field.id} label={field.question} {...field} />;

  return <p>Unsupported field</p>;
};

export default FlexibleField;
