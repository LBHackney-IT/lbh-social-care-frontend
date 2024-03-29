import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import { GetServerSideProps } from 'next';
import { isAuthorised } from 'utils/auth';
import { getAllMashReferrals } from 'lib/mashReferral';
import MashDashboard from 'components/MashDashboard/MashDashboard';
import { MashReferral } from 'types';

interface Props {
  referrals: MashReferral[];
}

const TeamAssignments = ({ referrals }: Props): React.ReactElement => {
  return (
    <div>
      <DashboardWrapper>
        <MashDashboard referrals={referrals} />
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

  const mashReferrals = await getAllMashReferrals();

  return {
    props: {
      referrals: mashReferrals,
    },
  };
};

export default TeamAssignments;
