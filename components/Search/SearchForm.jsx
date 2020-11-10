import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import isPast from 'date-fns/isPast';
import isPostcodeValid from 'uk-postcode-validator';

import { Button, TextInput, DateInput } from 'components/Form';
import { getQueryString } from 'utils/urls';

const isDetailsFormEmpty = ({
  first_name,
  last_name,
  date_of_birth,
  postcode,
}) =>
  first_name === '' && last_name === '' && !date_of_birth && postcode === '';

const isMosaicFormEmpty = ({ mosaicId }) => mosaicId === '';

const SearchForm = ({ onFormSubmit, query }) => {
  const [mosaicSearchDisabled, setMosaicSearchDisabled] = useState(false);
  const [detailsSearchDisabled, setDetailsSearchDisabled] = useState(false);
  const {
    register,
    errors,
    control,
    watch,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: query,
  });
  const onSubmit = async (formData) => {
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
            disabled={detailsSearchDisabled}
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
                  (value && isPostcodeValid(value)) ||
                  'You entered an invalid postcode',
              },
            })}
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
      </div>
      <Button label="Search" type="submit" disabled={!isDirty} />
    </form>
  );
};

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
