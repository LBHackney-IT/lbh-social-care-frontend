import { MashReferral, ReferralStage } from 'types';
import { getMashReferral } from 'lib/mashReferral';
import { GetServerSideProps } from 'next';
import { isAuthorised } from 'utils/auth';
import ScreeningDecisionForm from 'components/MashForms/ScreeningDecisionForm';

interface Props {
  referral: MashReferral;
  workerEmail: string;
}

const ScreeningDecision = ({
  referral,
  workerEmail,
}: Props): React.ReactElement => {
  return (
    <ScreeningDecisionForm referral={referral} workerEmail={workerEmail} />
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const user = isAuthorised(req);

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: `/login`,
      },
    };
  }

  const referral = await getMashReferral(Number(params?.id));

  if (!referral || referral.stage !== ReferralStage.SCREENING) {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  return {
    props: {
      referral,
      workerEmail: user.email,
    },
  };
};

export default ScreeningDecision;
