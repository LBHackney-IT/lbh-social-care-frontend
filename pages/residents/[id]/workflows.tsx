import Layout from 'components/ResidentPage/Layout';
import WorkflowTree, {
  WorkflowTreeSkeleton,
} from 'components/ResidentPage/WorkflowTree';
import useWorkflows from 'hooks/useWorkflows';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { isAuthorised } from 'utils/auth';
import Link from 'next/link';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

interface Props {
  resident: Resident;
}

const WorkflowsPage = ({ resident }: Props): React.ReactElement => {
  const { data, error } = useWorkflows(resident.id, 1000);
  const workflowsToShow = data?.workflows && data.workflows.length > 0;

  return (
    <Layout resident={resident} title="Workflows">
      <>
        {!data && !error ? (
          <WorkflowTreeSkeleton />
        ) : workflowsToShow ? (
          <WorkflowTree workflows={data.workflows} socialCareId={resident.id} />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <>
            <p className="lbh-body">This resident has no workflows yet. </p>
            <Link
              href={`${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}/workflows/new?social_care_id=${resident.id}`}
            >
              <a className="govuk-button lbh-button lbh-button--secondary">
                Start a workflow
              </a>
            </Link>
          </>
        )}
      </>
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
