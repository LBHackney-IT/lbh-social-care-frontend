import { Workflow, WorkflowType } from './types';
import Link from 'next/link';
import { formatDate } from 'utils/date';
import { prettyStatus } from 'lib/workflows/status';

interface WorkflowChunkProps {
  workflow: Workflow;
}

export const WorkflowChunk = ({
  workflow,
}: WorkflowChunkProps): React.ReactElement => (
  <>
    <Link
      href={`${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}/workflows/${workflow.id}`}
    >
      {workflow?.form?.name || workflow.formId}
    </Link>

    {workflow.type === WorkflowType.Reassessment && (
      <span className="govuk-tag lbh-tag">Reassessment</span>
    )}

    {!workflow.submittedAt && (
      <span className="govuk-tag lbh-tag lbh-tag--yellow">In progress</span>
    )}

    <p className="lbh-body-xs">
      Started {formatDate(workflow.createdAt.toString())} ·{' '}
      {prettyStatus(workflow)}
    </p>

    <p className="lbh-body-xs">
      {workflow.assignee
        ? `Assigned to ${workflow.assignee.name || workflow.assignee.email}`
        : 'Unassigned'}
    </p>
  </>
);

interface Props {
  workflows?: Workflow[];
  socialCareId: number;
}

const WorkflowOverview = ({
  workflows,
  socialCareId,
}: Props): React.ReactElement => {
  const mostRecent = workflows?.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  )[0];
  const inProgress = workflows?.filter((w) => !w.submittedAt);

  return (
    <>
      <h3 className="lbh-heading-h4">Most recent</h3>
      {mostRecent && <WorkflowChunk workflow={mostRecent} />}

      <h3 className="lbh-heading-h4">In progress</h3>
      {inProgress?.map((w) => (
        <WorkflowChunk workflow={w} key={w.id} />
      ))}

      <h3 className="lbh-heading-h4">Review soon</h3>
      {/* TODO */}

      <p>
        <Link href={`/residents/${socialCareId}/workflows`}>See all</Link>
        <a
          href={`${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}?quick_filter=all&social_care_id=${socialCareId}&touched_by_me=true`}
        >
          See on planner
        </a>
      </p>
    </>
  );
};

export default WorkflowOverview;
