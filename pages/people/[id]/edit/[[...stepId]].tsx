import { useState, ReactElement } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import CustomConfirmation from 'components/Steps/PersonConfirmation';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useResident, updateResident } from 'utils/api/residents';
import { getMacroEthnicity } from 'utils/person';

import formSteps from 'data/forms/create-new-person';

import type { User } from 'types';

const StepHeader = () => (
  <h1
    key="form-title"
    className="govuk-fieldset__legend--xl gov-weight-lighter"
  >
    Update person details
  </h1>
);

interface FormData {
  contextFlag: 'A' | 'C';
  nhsNumber: string;
  [key: string]: unknown;
}

const UpdatePerson = (): ReactElement => {
  const { query } = useRouter();
  const [personId] = useState(Number(query.id));
  const { data: person, error } = useResident(personId);
  const { user } = useAuth() as { user: User };
  const onFormSubmit = async (formData: FormData) => {
    const ref = await updateResident(personId, {
      ...formData,
      contextFlag: formData.contextFlag || user.permissionFlag,
      nhsNumber: Number(formData.nhsNumber),
      createdBy: user.email,
      restricted: formData.restricted || person?.restricted,
    });
    return ref;
  };
  if (error) {
    return <ErrorMessage label={error.message} />;
  }
  if (!person) {
    return <Spinner />;
  }
  return (
    <FormWizard
      formPath={`/people/${personId}/edit/`}
      stepPath={`/people/[id]/edit/[[...stepId]]`}
      formSteps={formSteps}
      title="Update person"
      defaultValues={{
        user,
        ...{
          ...person,
          macroEthnicity:
            person.ethnicity && getMacroEthnicity(person.ethnicity),
        },
      }}
      onFormSubmit={onFormSubmit}
      successMessage="Update person confirmed"
      customConfirmation={CustomConfirmation}
      stepHeader={StepHeader}
    />
  );
};

export default UpdatePerson;
