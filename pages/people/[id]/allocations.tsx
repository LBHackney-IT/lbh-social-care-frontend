import { getResident } from 'lib/residents';
import Layout from 'components/NewPersonView/Layout';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import AllocatedWorkers from 'components/AllocatedWorkers/AllocatedWorkers';
import { isAuthorised } from '../../../utils/auth';

interface Props {
  person: Resident;
}

const PersonAllocationsPage = ({ person }: Props): React.ReactElement => (
  <Layout person={person}>
    <AllocatedWorkers person={person} />
  </Layout>
);

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
