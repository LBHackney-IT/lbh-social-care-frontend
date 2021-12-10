import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import { GetServerSideProps } from 'next';
import { isAuthorised } from 'utils/auth';
import { getAllMashReferrals } from 'lib/mashReferral';
import MashDashboard from 'components/MashDashboard/MashDashboard';
import { MashReferral } from 'types';

interface Props {
  referrals: MashReferral[];
  workerEmail: string;
}

const TeamAssignments = ({
  referrals,
  workerEmail,
}: Props): React.ReactElement => {
  return (
    <div>
      <DashboardWrapper>
        <MashDashboard referrals={referrals} workerEmail={workerEmail} />
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
      workerEmail: user.email,
    },
  };
};

export default TeamAssignments;
