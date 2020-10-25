import { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import isValid from 'date-fns/isValid';
import isPast from 'date-fns/isPast';

import { Button, TextInput, DateInput } from 'components/Form';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { getResidents } from 'utils/api/residents';

const SearchByDetails = ({ onResult, setLoading }) => {
  const [formError, setFormError] = useState();
  const { register, errors, control, handleSubmit } = useForm();
  const onSubmit = async (formData) => {
    setFormError(null);
    setLoading(true);
    return !formData.first_name &&
      !formData.last_name &&
      !formData.date_of_birth
      ? setFormError('You need to enter name or date of birth')
      : onResult(getResidents(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cx({ 'govuk-form-group--error': Boolean(formError) })}>
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
        <DateInput
          label="Date of Birth:"
          labelSize="s"
          name="date_of_birth"
          error={errors.date_of_birth}
          control={control}
          rules={{
            validate: {
              valid: (value) =>
                value &&
                (isValid(new Date(value)) || 'Must be a is valid Date'),
              past: (value) =>
                value && (isPast(new Date(value)) || 'Must be a past Date'),
            },
          }}
        />
        {formError && <ErrorMessage label={formError} />}
      </div>
      <Button label="Search" type="submit" />
    </form>
  );
};

SearchByDetails.propTypes = {
  onResult: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default SearchByDetails;
