import Collapsible from 'components/ResidentPage/Collapsible';
import DataBlock from 'components/ResidentPage/DataBlock';
import Layout from 'components/ResidentPage/Layout';
import Mapping from 'components/ResidentPage/Mapping';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { isAuthorised } from 'utils/auth';

interface Props {
  resident: Resident;
}

const ResidentPage = ({ resident }: Props): React.ReactElement => (
  <Layout resident={resident}>
    <DataBlock
      title="Personal details"
      list={resident}
      socialCareId={resident.id.toString()}
    />

    <Collapsible title="Housing">
      <Mapping resident={resident} />
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
