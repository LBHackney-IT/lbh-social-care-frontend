import ContactForm from 'components/MashForms/ContactForm';
import React from 'react';
import { getMashReferral } from 'lib/mashReferral';
import { MashReferral } from 'types';
import { isAuthorised } from 'utils/auth';
import { GetServerSideProps } from 'next';

interface Props {
  referral: MashReferral;
  workerEmail: string;
}

const ContactDecision = ({
  referral,
  workerEmail,
}: Props): React.ReactElement => {
  return <ContactForm referral={referral} workerEmail={workerEmail} />;
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const referral = await getMashReferral(params?.id as string);

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
      workerEmail: user.email,
    },
  };
};

export default ContactDecision;
