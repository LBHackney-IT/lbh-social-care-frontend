import { useState, ReactElement } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import CustomConfirmation from 'components/Steps/PersonConfirmation';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useResident, updateResident } from 'utils/api/residents';
import { getMacroEthnicity } from 'utils/person';

import form from 'data/forms/create-new-person';

import type { User } from 'types';

const StepHeader = () => (
  <>
    <h1
      key="form-title"
      className="govuk-fieldset__legend--xl gov-weight-lighter"
    >
      Update person details
    </h1>
  </>
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
      restricted: formData.restricted ? 'Y' : 'N',
      nhsNumber: Number(formData.nhsNumber),
      createdBy: user.email,
    });
    return ref;
  };
  if (error) {
    return <ErrorMessage />;
  }
  if (!person) {
    return <Spinner />;
  }
  return (
    <FormWizard
      formPath={`/people/${personId}/edit/`}
      formSteps={form.steps}
      title={form.title}
      defaultValues={{
        user,
        ...{
          ...person,
          macroEthnicity:
            person.ethnicity && getMacroEthnicity(person.ethnicity),
        },
      }}
      onFormSubmit={onFormSubmit}
      successMessage={form.successMessage}
      customConfirmation={CustomConfirmation}
      stepHeader={StepHeader}
    />
  );
};

export default UpdatePerson;
