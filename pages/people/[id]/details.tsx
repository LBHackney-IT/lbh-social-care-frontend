import { getResident } from 'lib/residents';
import Layout from 'components/NewPersonView/Layout';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import PersonDetails from 'components/PersonView/PersonDetails';
import { isAuthorised } from '../../../utils/auth';
import { useRouter } from 'next/router';
import ConfirmationBanner from 'components/ConfirmationBanner/ConfirmationBanner';

interface Props {
  person: Resident;
}

const PersonAllocationsPage = ({ person }: Props): React.ReactElement => {
  const router = useRouter();
  const success = Boolean(router.query.success);
  return (
    <>
      {success == true && <ConfirmationBanner title={'Flagged status added'} />}
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
