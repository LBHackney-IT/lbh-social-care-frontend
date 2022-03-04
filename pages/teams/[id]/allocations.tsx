import TeamLayout from 'components/TeamPage/Layout';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTeams } from 'utils/api/allocatedWorkers';
import { isAuthorised } from 'utils/auth';

interface Props {
  id: number;
}

const AllocationsPage = ({ id }: Props): React.ReactElement => {
  const { data: teamData } = useTeams({
    ageContext: 'A',
  });
  const team = teamData?.teams?.find((t) => t.id === id);

  const { replace } = useRouter();

  useEffect(() => {
    if (teamData && !team) replace('/404'); // handle team not found
  }, [team, teamData, replace]);

  return <TeamLayout team={team}>Allocations go here</TeamLayout>;
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
