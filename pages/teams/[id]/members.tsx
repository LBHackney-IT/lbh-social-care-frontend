import TeamLayout from 'components/TeamPage/Layout';
import Seo from 'components/Layout/Seo/Seo';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import TeamWorkerList from 'components/TeamPage/TeamWorkerList/TeamWorkerList';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { GetServerSideProps } from 'next';
import { useTeams, useTeamWorkers } from 'utils/api/allocatedWorkers';
import { isAuthorised } from 'utils/auth';

interface Props {
  id: number;
}

const AllocationsPage = ({ id }: Props): React.ReactElement => {
  const { data: teamData } = useTeams({
    ageContext: 'A',
  });
  const team = teamData?.teams?.find((t) => t.id === id);
  const { data: users } = useTeamWorkers(id);

  if (!team) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Seo title={`Team allocations`} />
      <DashboardWrapper>
        <TeamLayout team={team}>
          <>{users && <TeamWorkerList users={users} />}</>
        </TeamLayout>
      </DashboardWrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const user = isAuthorised(req);

  // redirect unauthorised users to login
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
      id: Number(params?.id),
    },
  };
};

export default AllocationsPage;
