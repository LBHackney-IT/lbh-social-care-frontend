import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import isPast from 'date-fns/isPast';

import {
  Button,
  TextInput,
  Checkbox,
  DateInput,
  Select,
} from 'components/Form';
import { getQueryString } from 'utils/urls';
import CASE_NOTE_TYPES from 'data/caseNoteTypes';

const SearchCasesForm = ({ onFormSubmit, query, user }) => {
  const {
    register,
    errors,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: query,
  });
  const onSubmit = async ({ myNotesOnly, ...formData }) => {
    onFormSubmit(formData);
    const qs = getQueryString({
      ...formData,
      worker_email: myNotesOnly ? user.email : '',
    });
    Router.replace(`/cases/search?${qs}`, `/cases/search?${qs}`, {
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
        <div className="govuk-grid-column-full">
          <Checkbox
            label="Search by exact match"
            labelSize="s"
            name="exact_match"
            hint=""
            register={register}
          />
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <DateInput
            label="Date created from:"
            labelSize="s"
            name="date_created_from"
            error={errors.date_created_from}
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
          <DateInput
            label="Date created to:"
            labelSize="s"
            name="date_created_to"
            error={errors.date_created_to}
            control={control}
            rules={{
              validate: {
                past: (value) =>
                  value && (isPast(new Date(value)) || 'Must be a past Date'),
              },
            }}
          />
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <Select
            name="case_note_type"
            label="Filter by form type"
            register={register}
            options={CASE_NOTE_TYPES}
          />
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <Checkbox
            label="Only include notes I've created"
            name="myNotesOnly"
            register={register}
          />
        </div>
      </div>

      <Button label="Search" type="submit" disabled={!isDirty} />
    </form>
  );
};

SearchCasesForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  query: PropTypes.shape({}),
};

export default SearchCasesForm;
