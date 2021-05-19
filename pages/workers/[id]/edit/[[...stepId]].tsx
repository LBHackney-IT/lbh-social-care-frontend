import { useRouter } from 'next/router';

import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import { useTeams } from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useWorkerById, updateWorker } from 'utils/api/workers';

import { User } from 'types';

import formSteps from 'data/forms/edit-worker';

interface FormData {
  nhsNumber: string;
  [key: string]: unknown;
}

const UpdateWorker = (): React.ReactElement => {
  const { query } = useRouter();
  const workerId = Number(query.id as string);
  const { user } = useAuth() as { user: User };
  const { data: { teams: ATeams } = {}, error: errorATeams } = useTeams({
    ageContext: 'A',
  });
  const { data: { teams: CTeams } = {}, error: errorCTeams } = useTeams({
    ageContext: 'C',
  });
  const { data, error: errorWorker } = useWorkerById(workerId);
  if (errorATeams || errorCTeams || errorWorker) {
    return <ErrorMessage />;
  }
  if (!ATeams || !CTeams || !data) {
    return <Spinner />;
  }
  const onFormSubmit = async ({ team, ...formData }: FormData) => {
    await updateWorker(workerId, {
      ...formData,
      workerId,
      teams: (formData.contextFlag === 'A' ? ATeams : CTeams).filter(
        ({ name }) => name === team
      ),
      createdBy: user.email,
    });
  };
  return (
    <FormWizard
      formPath={`/workers/${workerId}/edit/`}
      formSteps={formSteps}
      title="Update Worker"
      onFormSubmit={onFormSubmit}
      defaultValues={{
        ...data,
        user,
        team: data.teams?.[0].name,
        teams: {
          A: ATeams.map(({ name }) => name),
          C: CTeams.map(({ name }) => name),
        },
      }}
      successMessage="Worker updated"
    />
  );
};

export default UpdateWorker;
