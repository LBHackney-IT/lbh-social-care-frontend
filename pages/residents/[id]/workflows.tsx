import Layout from 'components/ResidentPage/Layout';
import useWorkflows from 'hooks/useWorkflows';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { isAuthorised } from 'utils/auth';
import Link from 'next/link';
import { Workflow } from 'components/ResidentPage/types';
import { useMemo } from 'react';

interface Props {
  resident: Resident;
}

interface WorkflowWithChildren extends Workflow {
  children?: WorkflowWithChildren[];
}

const convertWorkflowsToTree = (
  workflows: Workflow[]
): WorkflowWithChildren[] => {
  const topLevel = workflows.filter((w) => !w.workflowId);
  return topLevel.map((w) => {
    return {
      ...w,
      children: workflows.filter((x) => x.workflowId === w.id),
    };
  });
};

const WorkflowsPage = ({ resident }: Props): React.ReactElement => {
  const { data } = useWorkflows(resident.id, 1000);

  const workflows = data?.workflows;
  const tree = useMemo(
    () => convertWorkflowsToTree(workflows || []),
    [workflows]
  );

  return (
    <Layout resident={resident}>
      <ul className="lbh-list">
        {tree?.map((w) => (
          <li key={w.id}>
            <Link
              href={`${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}/workflows/${w.id}`}
            >
              {w?.form?.name || w.formId}
            </Link>
            — {w.workflowId}
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
