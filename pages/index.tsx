import Seo from 'components/Layout/Seo/Seo';
import WorkerAllocations from 'components/WorkerView/WorkerAllocations/WorkerAllocations';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import { GetServerSideProps } from 'next';
import { isAuthorised } from 'utils/auth';
import { useWorker } from 'utils/api/workers';

interface Props {
  email: string;
}

const MyCasesPage = ({ email }: Props): React.ReactElement => {
  const { data: workers } = useWorker({
    email: email,
  });

  let worker;
  if (workers && workers?.[0]) {
    worker = workers[0];
  }

  return (
    <div>
      <Seo title="My work" />
      <DashboardWrapper>
        <>
          <h1 className="govuk-!-margin-bottom-8">My work</h1>
          {worker ? (
            <WorkerAllocations workerId={worker.id} />
          ) : (
            'Logged user is not a worker'
          )}
        </>
      </DashboardWrapper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = isAuthorised(req);

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: `/login`,
      },
    };
  }

  return {
    props: {
      email: user.email,
    },
  };
};

export default MyCasesPage;
