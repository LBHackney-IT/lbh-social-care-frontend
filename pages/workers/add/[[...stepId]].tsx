import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
// import { addWorker } from 'utils/api/worker';
import { useTeams } from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import { User } from 'types';

import form from 'data/forms/create-new-worker';

interface FormData {
  nhsNumber: string;
  [key: string]: unknown;
}

const CreateNewPerson = (): React.ReactElement => {
  const { user } = useAuth() as { user: User };
  const { data: { teams: ATeams } = {}, error: errorATeams } = useTeams({
    ageContext: 'A',
  });
  const { data: { teams: CTeams } = {}, error: errorCTeams } = useTeams({
    ageContext: 'C',
  });
  if (errorATeams || errorCTeams) {
    return <ErrorMessage />;
  }
  if (!ATeams || !CTeams) {
    return <Spinner />;
  }
  const onFormSubmit = async (formData: FormData) => {
    console.log({
      ...formData,
      createdBy: user.email,
    });
    // const ref = await addWorker({
    //   ...formData,
    //   createdBy: user.email,
    // });
    // return ref;
  };
  return (
    <FormWizard
      formPath={form.path}
      formSteps={form.steps}
      title={form.title}
      onFormSubmit={onFormSubmit}
      defaultValues={{
        user,
        teams: {
          A: ATeams.map(({ id, name }) => ({ value: id, text: name })),
          C: CTeams.map(({ id, name }) => ({ value: id, text: name })),
        },
      }}
      successMessage={form.successMessage}
    />
  );
};

export default CreateNewPerson;
