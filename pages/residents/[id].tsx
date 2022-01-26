import Collapsible from 'components/ResidentPage/Collapsible';
import Layout from 'components/ResidentPage/Layout';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { isAuthorised } from 'utils/auth';

interface Props {
  resident: Resident;
}

const ResidentPage = ({ resident }: Props): React.ReactElement => (
  <Layout resident={resident}>
    <Collapsible title="Personal details" linkText="See all/edit" linkHref="#">
      test
    </Collapsible>
    <Collapsible
      title="Workflows and documents"
      linkText="See all"
      linkHref="#"
    >
      test
    </Collapsible>
    <Collapsible title="Case notes" linkText="See all" linkHref="#">
      test
    </Collapsible>
    <Collapsible title="Housing" linkText="See all" linkHref="#">
      test
    </Collapsible>
    <Collapsible
      title="Relationships and key contacts"
      linkText="See all"
      linkHref="#"
    >
      test
    </Collapsible>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const user = isAuthorised(req);

  // redirect unauthorised users to login
  if (!user) {
    return {
      props: {},
      redirect: {
        destination: `/login`,
      },
    };
  }

  const resident = await getResident(Number(params?.id), user);

  // does the resident exist?
  if (!resident.id) {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  return {
    props: {
      resident,
    },
  };
};

export default ResidentPage;
