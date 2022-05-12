import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import { addWorker } from 'utils/api/workers';
import { useTeams } from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import { User } from 'types';

import formSteps from 'data/forms/create-new-worker';

interface FormData {
  nhsNumber: string;
  [key: string]: unknown;
}

const CreateNewWorker = (): React.ReactElement => {
  const { user } = useAuth() as { user: User };
  const { data: { teams: ATeams } = {}, error: errorATeams } = useTeams({
    ageContext: 'A',
  });
  const { data: { teams: CTeams } = {}, error: errorCTeams } = useTeams({
    ageContext: 'C',
  });
  if (errorATeams || errorCTeams) {
    return <ErrorMessage label="Error while loading Team data" />;
  }
  if (!ATeams || !CTeams) {
    return <Spinner />;
  }
  const onFormSubmit = async ({ team, ...formData }: FormData) => {
    await addWorker({
      ...formData,
      teams: (formData.contextFlag === 'A' ? ATeams : CTeams).filter(
        ({ name }) => name === team
      ),
      createdBy: user.email,
    });
  };
  return (
    <FormWizard
      formPath="/workers/add/"
      stepPath="/workers/add/[[...stepId]]"
      formSteps={formSteps}
      title="Create New Worker"
      onFormSubmit={onFormSubmit}
      defaultValues={{
        user,
        teams: {
          A: ATeams.map(({ name }) => name),
          C: CTeams.map(({ name }) => name),
        },
      }}
      successMessage="New worker created"
    />
  );
};

export default CreateNewWorker;
