import Seo from 'components/Layout/Seo/Seo';
import WorkerAllocations from 'components/WorkerView/WorkerAllocations/WorkerAllocations';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import { GetServerSideProps } from 'next';
import { isAuthorised } from 'utils/auth';
import { useWorker } from 'utils/api/workers';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

interface Props {
  email: string;
}

const MyCasesPage = ({ email }: Props): React.ReactElement => {
  const { data: workers, error } = useWorker({
    email: email,
  });

  if (!workers || workers == null) {
    <Spinner />;
  }

  if (error) {
    return <ErrorMessage label="There was a problem getting the worker" />;
  }

  return (
    <div>
      <Seo title="My work" />
      <DashboardWrapper>
        <>
          <h1>My work</h1>
          {workers && workers?.length > 0 && (
            <WorkerAllocations workerId={workers[0].id} />
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
