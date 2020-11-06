import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import isValid from 'date-fns/isValid';
import isPast from 'date-fns/isPast';

import { Button, TextInput, DateInput } from 'components/Form';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { getQueryString } from 'utils/urls';

const isDetailsFormEmpty = ({ first_name, last_name, date_of_birth }) =>
  first_name === '' && last_name === '' && !date_of_birth;

const isMosaicFormEmpty = ({ mosaicId }) => mosaicId === '';

const SearchForm = ({ onFormSubmit, query }) => {
  const [formError, setFormError] = useState();
  const [mosaicSearchDisabled, setMosaicSearchDisabled] = useState(false);
  const [detailsSearchDisabled, setDetailsSearchDisabled] = useState(false);
  const { register, errors, control, watch, handleSubmit } = useForm({
    defaultValues: query,
  });
  const onSubmit = async (formData) => {
    setFormError(null);
    if (isDetailsFormEmpty(formData) && isMosaicFormEmpty(formData)) {
      return setFormError('You need to enter name or date of birth');
    }
    onFormSubmit(formData);
    const qs = getQueryString(formData);
    Router.replace(`/people/search?${qs}`, `/people/search?${qs}`, {
      shallow: true,
    });
  };
  const formWatcher = watch();
  useEffect(() => {
    mosaicSearchDisabled &&
      isDetailsFormEmpty(formWatcher) &&
      setMosaicSearchDisabled(false);
    !mosaicSearchDisabled &&
      !isDetailsFormEmpty(formWatcher) &&
      setMosaicSearchDisabled(true);
    detailsSearchDisabled &&
      isMosaicFormEmpty(formWatcher) &&
      setDetailsSearchDisabled(false);
    !detailsSearchDisabled &&
      !isMosaicFormEmpty(formWatcher) &&
      setDetailsSearchDisabled(true);
  }, [formWatcher]);
  useEffect(() => {
    Object.keys(query).length && onSubmit(query);
  }, []);
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
              disabled={detailsSearchDisabled}
            />
          </div>
          <div className="govuk-grid-column-one-half">
            <TextInput
              label="Last name:"
              labelSize="s"
              name="last_name"
              error={errors.last_name}
              register={register}
              disabled={detailsSearchDisabled}
            />
          </div>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <TextInput
              label="Mosaic ID:"
              labelSize="s"
              name="mosaicId"
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
              disabled={mosaicSearchDisabled}
            />
          </div>
          <div className="govuk-grid-column-one-half">
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
              disabled={detailsSearchDisabled}
            />
          </div>
        </div>
        {formError && <ErrorMessage label={formError} />}
      </div>
      <Button label="Search" type="submit" />
    </form>
  );
};

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
