import { GetServerSideProps } from 'next';
import { isAuthorised } from 'utils/auth';
import { getMashReferral } from 'lib/mashReferral';
import { MashReferral, ReferralStage } from 'types';
import React from 'react';
import InitialDecisionForm from 'components/MashForms/InitialDecisionForm';

interface Props {
  referral: MashReferral;
  workerEmail: string;
}

const InitialDecision = ({
  referral,
  workerEmail,
}: Props): React.ReactElement => {
  return <InitialDecisionForm referral={referral} workerEmail={workerEmail} />;
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

  if (!referral || referral.stage !== ReferralStage.INITIAL) {
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

export default InitialDecision;
