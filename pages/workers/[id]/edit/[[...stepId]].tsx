import { useRouter } from 'next/router';

import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
// import { addWorker } from 'utils/api/worker';
import { useTeams } from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useWorkerById } from 'utils/api/workers';

import { User } from 'types';

import form from 'data/forms/create-new-worker';

interface FormData {
  nhsNumber: string;
  [key: string]: unknown;
}

const UpdateWorker = (): React.ReactElement => {
  const { query } = useRouter();
  const { user } = useAuth() as { user: User };
  const { data: { teams: ATeams } = {}, error: errorATeams } = useTeams({
    ageContext: 'A',
  });
  const { data: { teams: CTeams } = {}, error: errorCTeams } = useTeams({
    ageContext: 'C',
  });
  const { data, error: errorWorker } = useWorkerById(
    Number(query.id as string)
  );
  if (errorATeams || errorCTeams || errorWorker) {
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
        ...data,
        user,
        teams: {
          A: ATeams.map(({ name }) => name),
          C: CTeams.map(({ name }) => name),
        },
      }}
      successMessage={form.successMessage}
    />
  );
};

export default UpdateWorker;
