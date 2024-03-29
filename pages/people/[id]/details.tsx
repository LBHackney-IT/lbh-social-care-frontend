import { getResident } from 'lib/residents';
import Layout from 'components/NewPersonView/Layout';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import PersonDetails from 'components/PersonView/PersonDetails';
import { isAuthorised } from '../../../utils/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ConfirmationBanner from 'components/ConfirmationBanner/ConfirmationBanner';
import { ConditionalFeature } from 'lib/feature-flags/feature-flags';

interface Props {
  person: Resident;
}

const PersonAllocationsPage = ({ person }: Props): React.ReactElement => {
  const [showAddedCaseStatusConfirmation, setshowAddedCaseStatusConfirmation] =
    useState(false);

  const router = useRouter();

  useEffect(() => {
    setshowAddedCaseStatusConfirmation(Boolean(router.query.flaggedStatus));
  }, [router.query.flaggedStatus]);

  return (
    <>
      {showAddedCaseStatusConfirmation && (
        <ConditionalFeature name="case-status">
          <ConfirmationBanner
            title={(router.query.message as string) ?? 'Flagged status added'}
          />
        </ConditionalFeature>
      )}
      <Layout person={person}>
        <PersonDetails person={person} />
      </Layout>
    </>
  );
};
PersonAllocationsPage.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const user = isAuthorised(req);

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: '/login',
      },
    };
  }
  const person = await getResident(Number(params?.id), user);

  if (!person.id) {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  return {
    props: {
      person,
    },
  };
};

export default PersonAllocationsPage;
