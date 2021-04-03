import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import { addResident } from 'utils/api/residents';
import CustomConfirmation from 'components/Steps/PersonConfirmation';

import { User } from 'types';

import form from 'data/forms/create-new-person';

const StepHeader = () => (
  <>
    <h1
      key="form-title"
      className="govuk-fieldset__legend--xl gov-weight-lighter"
    >
      Add a new person
    </h1>
    <p key="subtitle" className="govuk-body">
      Use this form to add a new referral
    </p>
  </>
);

interface FormData {
  nhsNumber: string;
  [key: string]: unknown;
}

const CreateNewPerson = (): React.ReactElement => {
  const { user } = useAuth() as { user: User };
  const onFormSubmit = async (formData: FormData) => {
    const ref = await addResident({
      ...formData,
      contextFlag: formData.contextFlag || user.permissionFlag,
      nhsNumber: Number(formData.nhsNumber),
      createdBy: user.email,
    });
    return ref;
  };
  return (
    <FormWizard
      formPath={form.path}
      formSteps={form.steps}
      title={form.title}
      onFormSubmit={onFormSubmit}
      defaultValues={{ user }}
      successMessage={form.successMessage}
      customConfirmation={CustomConfirmation}
      stepHeader={StepHeader}
    />
  );
};

export default CreateNewPerson;
