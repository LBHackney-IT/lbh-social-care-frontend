import Layout from 'components/ResidentPage/Layout';
import useWorkflows from 'hooks/useWorkflows';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { isAuthorised } from 'utils/auth';
import Link from 'next/link';

interface Props {
  resident: Resident;
}

const WorkflowsPage = ({ resident }: Props): React.ReactElement => {
  const { data } = useWorkflows(resident.id, 1000);

  const workflows = data?.workflows;

  return (
    <Layout resident={resident}>
      <ul className="lbh-list">
        {workflows?.map((w) => (
          <li key={w.id}>
            <Link
              href={`${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}/workflows/${w.id}`}
            >
              {w?.form?.name || w.formId}
            </Link>
          </li>
        ))}
      </ul>
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
