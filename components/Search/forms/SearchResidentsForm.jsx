import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import isPast from 'date-fns/isPast';
import isPostcodeValid from 'uk-postcode-validator';

import { Button, TextInput, DateInput } from 'components/Form';
import { getQueryString } from 'utils/urls';

const SearchResidentsForm = ({ onFormSubmit, query }) => {
  const {
    register,
    errors,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: query,
  });
  const { pathname, replace } = useRouter();
  const onSubmit = async (formData) => {
    onFormSubmit(formData);
    const qs = getQueryString(formData);
    replace(`${pathname}?${qs}`, `${pathname}?${qs}`, {
      shallow: true,
    });
  };
  useEffect(() => {
    Object.keys(query).length && onSubmit(query);
  }, []);
  return (
    <form role="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <TextInput
            label="First name:"
            labelSize="s"
            name="first_name"
            error={errors.first_name}
            register={register}
          />
        </div>
        <div className="govuk-grid-column-one-half">
          <TextInput
            label="Last name:"
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
            label="Date of Birth:"
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
            label="Postcode:"
            labelSize="s"
            name="postcode"
            hint="i.e. E8 3AS"
            inputClassName="govuk-input--width-10"
            error={errors.postcode}
            register={register({
              required: false,
              validate: {
                valid: (value) =>
                  value === '' ||
                  (value && isPostcodeValid(value)) ||
                  'You entered an invalid postcode',
              },
            })}
          />
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <TextInput
            label="Mosaic ID:"
            labelSize="s"
            name="mosaic_id"
            hint="e.g. 1234567890"
            inputClassName="govuk-input--width-10"
            inputMode="numeric"
            error={errors.mosaicId}
            register={register({
              pattern: {
                value: /^[0-9]+$/,
                message: 'Mosaic ID must be a number',
              },
            })}
          />
        </div>
      </div>
      <Button label="Search" type="submit" disabled={!isDirty} />
    </form>
  );
};

SearchResidentsForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  query: PropTypes.shape({}),
};

export default SearchResidentsForm;
