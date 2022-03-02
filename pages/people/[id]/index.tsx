import { getResident } from 'lib/residents';
import Layout from 'components/NewPersonView/Layout';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { canManageCases } from 'lib/permissions';
import { isAuthorised } from 'utils/auth';
import PersonHistory from 'components/NewPersonView/PersonHistory';

interface Props {
  person: Resident;
}

const PersonPage = ({ person }: Props): React.ReactElement => {
  return (
    <Layout person={person}>
      <>
        <PersonHistory personId={person.id} />
      </>
    </Layout>
  );
};

PersonPage.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
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

  const person = await getResident(Number(params?.id), user);

  if (!person.id) {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  if (!canManageCases(user, person)) {
    return {
      props: {},
      redirect: {
        destination: `/people/${person.id}/details`,
      },
    };
  }

  return {
    props: {
      person,
    },
  };
};

export default PersonPage;
