import { useEffect } from 'react';
import { useContext } from 'react';
import UserContext from 'components/UserContext/UserContext';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import isPast from 'date-fns/isPast';
import { getQueryString } from 'utils/urls';

import {
  Button,
  TextInput,
  Checkbox,
  DateInput,
  Select,
} from 'components/Form';

const isSearchFormEmpty = ({
  first_name,
  last_name,
  mosaic_id,
  exactMatch,
  myNotesOnly,
}) =>
  first_name === '' &&
  last_name === '' &&
  !mosaic_id &&
  !exactMatch &&
  !myNotesOnly;

const SearchCasesForm = ({ onFormSubmit, query }) => {
  const {
    register,
    errors,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: query,
  });

  const { user } = useContext(UserContext);

  const onSubmit = async (formData) => {
    let data = formData;

    data.worker_email = formData.myNotesOnly ? user.email : '';

    onFormSubmit(data);
    const qs = getQueryString(data);
    Router.replace(`/cases/search?${qs}`, `/cases/search?${qs}`, {
      shallow: true,
    });
  };
  
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
              name="exactMatch"
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
              name="caseNoteType"
              label="Filter by form type"
              register={register}
              options={[
                'Care Charges',
                'Case Audit',
                'Case Summary',
                'Contact with Health Professional',
                'Correspondence',
                'Death Notification',
                'Discharge Planning - HSWT',
                'Duty Avtion',
                'Home Visit',
                'ILDS Duty Action',
                'Integrated Independence Team Progress',
                'Legacy Adult Assessment',
                "Manager's Decision",
                'No Reply To Home Visit',
                'Office Visit',
                'Record of Meeting',
                'Record of Supervision Discussion',
                'Safeguarding',
                'Telephone Contact',
                'Case Transfer',
                'Additional Hours Requested',
                'Contact Adults',
                'Significant Information on an Open Case',
                'Other',
              ]}
            />
          </div>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <Checkbox
              label="Only include notes I've created"
              labelSize=""
              name="myNotesOnly"
              hint=""
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
