import { getResident } from 'lib/residents';
import Layout from 'components/NewPersonView/Layout';
import { GetServerSideProps } from 'next';
import { Resident, User } from 'types';
import { canViewRelationships } from 'lib/permissions';
import Relationships from 'components/pages/people/relationships/view/Relationships';
import { useAuth } from 'components/UserContext/UserContext';

interface Props {
  person: Resident;
}

const PersonAllocationsPage = ({ person }: Props): React.ReactElement => {
  const { user } = useAuth() as { user: User };

  return (
    <Layout person={person}>
      {canViewRelationships(user, person) ? (
        <Relationships person={person} />
      ) : (
        "You don't have permission to see this person's relationships"
      )}
    </Layout>
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
