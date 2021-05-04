import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import isPast from 'date-fns/isPast';

import { convertFormat } from 'utils/date';
import {
  TextInput,
  EmailInput,
  Checkbox,
  DateInput,
  Autocomplete,
} from 'components/Form';
import Button from 'components/Button/Button';
import { useAuth } from 'components/UserContext/UserContext';
import { getFormsByUserPermission } from 'utils/forms';
import { User } from 'types';

interface FormValues {
  first_name?: string;
  last_name?: string;
  exact_name_match?: string;
  start_date?: string | null;
  end_date?: string | null;
  form_name?: string | null;
  worker_email?: string;
  my_notes_only?: string;
}

interface Props {
  onFormSubmit: (formData?: FormValues) => void;
  showSearchByPerson?: boolean;
  defaultValues: FormValues;
  ctaText?: string;
}

const SearchCasesForm = ({
  onFormSubmit,
  showSearchByPerson = true,
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
  const { user } = useAuth() as { user: User };
  const formNameOptions = useMemo(() => getFormsByUserPermission(user), [user]);
  return (
    <form role="form" onSubmit={handleSubmit((data) => onFormSubmit(data))}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <TextInput
            label="First name:"
            labelSize="s"
            name="first_name"
            error={errors.first_name}
            register={register}
            rules={{
              minLength: {
                value: 2,
                message: 'Requires at least a minimum of 2 letters.',
              },
            }}
          />
        </div>
        <div className="govuk-grid-column-one-half">
          <TextInput
            label="Last name:"
            labelSize="s"
            name="last_name"
            error={errors.last_name}
            register={register}
            rules={{
              minLength: {
                value: 2,
                message: 'Requires at least a minimum of 2 letters.',
              },
            }}
          />
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <Checkbox
            label="Search by exact match"
            labelSize="s"
            name="exact_name_match"
            register={register}
          />
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <DateInput
            label="Date created from:"
            labelSize="s"
            name="start_date"
            format="EU"
            error={errors.start_date}
            control={control}
            rules={{
              validate: {
                past: (value) =>
                  value &&
                  (isPast(new Date(convertFormat(value))) ||
                    'Must be a past Date'),
              },
            }}
          />
        </div>
        <div className="govuk-grid-column-one-half">
          <DateInput
            label="Date created to:"
            labelSize="s"
            name="end_date"
            format="EU"
            error={errors.end_date}
            control={control}
            rules={{
              validate: {
                past: (value) =>
                  value &&
                  (isPast(new Date(convertFormat(value))) ||
                    'Must be a past Date'),
              },
            }}
          />
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <Autocomplete
            name="form_name"
            label="Filter by form type:"
            labelSize="s"
            control={control}
            options={formNameOptions}
          />
        </div>
        {showSearchByPerson && (
          <div className="govuk-grid-column-one-half">
            <EmailInput
              name="worker_email"
              label="Uploaded by:"
              labelSize="s"
              placeholder="Email"
              register={register}
            />
          </div>
        )}
      </div>
      {showSearchByPerson && (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <Checkbox
              label="Only include records I've created"
              name="my_notes_only"
              register={register}
            />
          </div>
        </div>
      )}
      <Button label={ctaText} type="submit" disabled={!isDirty} />
      <button
        className="govuk-link"
        onClick={() => {
          reset({
            start_date: null,
            end_date: null,
            form_name: null,
          });
          onFormSubmit();
        }}
        style={{
          marginLeft: '1rem',
          lineHeight: '2.5rem',
        }}
      >
        Clear {ctaText.toLowerCase()}
      </button>
    </form>
  );
};

export default SearchCasesForm;
