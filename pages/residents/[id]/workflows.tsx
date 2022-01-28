import Layout from 'components/ResidentPage/Layout';
import WorkflowTree from 'components/ResidentPage/WorkflowTree';
import useWorkflows from 'hooks/useWorkflows';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { isAuthorised } from 'utils/auth';

interface Props {
  resident: Resident;
}

const WorkflowsPage = ({ resident }: Props): React.ReactElement => {
  const { data } = useWorkflows(resident.id, 1000);
  const workflows = data?.workflows;

  return (
    <Layout resident={resident} title="Workflows">
      <>{workflows && <WorkflowTree workflows={workflows} />}</>
    </Layout>
  );
};

export default WorkflowsPage;

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
