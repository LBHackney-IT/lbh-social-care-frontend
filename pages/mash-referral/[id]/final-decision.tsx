import FinalDecisionForm from 'components/MashForms/FinalDecisionForm';
import { getMashReferral } from 'lib/mashReferral';
import { GetServerSideProps } from 'next';
import { MashReferral, ReferralStage } from 'types';
import { isAuthorised } from 'utils/auth';

interface Props {
  referral: MashReferral;
  workerEmail: string;
}

const FinalDecision = ({
  referral,
  workerEmail,
}: Props): React.ReactElement => {
  return <FinalDecisionForm referral={referral} workerEmail={workerEmail} />;
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

  const referral = await getMashReferral(params?.id as string);

  if (!referral || referral.stage !== ReferralStage.FINAL) {
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

export default FinalDecision;
