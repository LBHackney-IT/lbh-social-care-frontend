import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import { GetServerSideProps } from 'next';
import { isAuthorised } from 'utils/auth';
import { getAllMashReferrals, getMyMashReferrals } from 'lib/mashReferral';
import MashDashboard from 'components/MashDashboard/MashDashboard';
import { MashReferral } from 'types';

interface Props {
  referrals: MashReferral[];
  myMashReferrals: MashReferral[];
}

const TeamAssignments = ({
  referrals,
  myMashReferrals,
}: Props): React.ReactElement => {
  return (
    <div>
      <DashboardWrapper>
        <MashDashboard referrals={referrals} myReferrals={myMashReferrals} />
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
  const myMashReferrals = await getMyMashReferrals(user?.email);

  return {
    props: {
      referrals: mashReferrals,
      myMashReferrals: myMashReferrals,
    },
  };
};

export default TeamAssignments;
