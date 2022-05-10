import TeamLayout from 'components/TeamPage/Layout';
import Seo from 'components/Layout/Seo/Seo';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import { GetServerSideProps } from 'next';
import { useTeams } from 'utils/api/allocatedWorkers';
import { isAuthorised } from 'utils/auth';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import TeamAllocationsList from 'components/TeamPage/TeamAllocationsList/TeamAllocationsList';

interface Props {
  id: number;
}

const AllocationsPage = ({ id }: Props): React.ReactElement => {
  const { data: teamData, error } = useTeams({
    ageContext: 'A',
  });
  const team = teamData?.teams?.find((t) => t.id === id);

  if (error) {
    return <ErrorMessage label={error.message} />;
  }
  if (!team) {
    return <ErrorMessage label={'Error while reading the Team information'} />;
  }

  return (
    <>
      <Seo title={`Team allocations`} />
      <DashboardWrapper>
        <TeamLayout team={team}>
          <TeamAllocationsList teamId={team.id} type={'unallocated'} />
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
