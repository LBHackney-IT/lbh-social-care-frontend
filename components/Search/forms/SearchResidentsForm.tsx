import React from 'react';
import { useForm } from 'react-hook-form';
import isPast from 'date-fns/isPast';
import { TextInput, DateInput } from 'components/Form';
import Button from 'components/Button/Button';

interface FormValues {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string | null;
  postcode?: string;
  person_id?: string;
}

interface Props {
  onFormSubmit: (formData?: FormValues) => void;
  defaultValues: FormValues;
  ctaText?: string;
}

const SearchResidentsForm = ({
  onFormSubmit,
  defaultValues,
  ctaText = 'Search',
}: Props): React.ReactElement => {
  const {
    register,
    errors,
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues,
  });
  return (
    <form role="form" onSubmit={handleSubmit((data) => onFormSubmit(data))}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <TextInput
            label="First name"
            labelSize="s"
            name="first_name"
            error={errors.first_name}
            register={register}
          />
        </div>
        <div className="govuk-grid-column-one-half">
          <TextInput
            label="Last name"
            labelSize="s"
            name="last_name"
            error={errors.last_name}
            register={register}
          />
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <DateInput
            label="Date of birth"
            labelSize="s"
            name="date_of_birth"
            error={errors.date_of_birth}
            control={control}
            rules={{
              validate: {
                past: (value) =>
                  value && (isPast(new Date(value)) || 'Must be a past Date'),
              },
            }}
          />
        </div>
        <div className="govuk-grid-column-one-half">
          <TextInput
            label="Postcode"
            labelSize="s"
            name="postcode"
            hint="e.g. E8 3AS"
            inputClassName="govuk-input--width-10"
            error={errors.postcode}
            register={register}
            rules={{
              validate: {
                valid: (value) =>
                  value === '' ||
                  (value && value.trim().length > 1) ||
                  'You must enter at least the first two letters of the postcode',
              },
            }}
          />
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <TextInput
            label="Social care ID"
            labelSize="s"
            name="person_id"
            hint="e.g. 1234567890"
            inputClassName="govuk-input--width-10"
            inputMode="numeric"
            error={errors.person_id}
            register={register}
          />
        </div>
      </div>
      <Button label={ctaText} type="submit" disabled={!isDirty} />
      <button
        className="lbh-link govuk-link"
        id="clear-link"
        onClick={(e) => {
          e.preventDefault();
          reset({
            date_of_birth: null,
          });
          onFormSubmit();
        }}
      >
        Clear {ctaText.toLowerCase()}
      </button>
    </form>
  );
};

export default SearchResidentsForm;
