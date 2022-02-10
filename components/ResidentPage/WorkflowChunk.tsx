import { Workflow, WorkflowType } from './types';
import Link from 'next/link';
import { formatDate } from 'utils/date';
import { prettyStatus } from 'lib/workflows/status';
import s from './WorkflowChunk.module.scss';

interface Props {
  workflow: Workflow;
}

export const WorkflowChunk = ({ workflow }: Props): React.ReactElement => (
  <div className={s.chunk}>
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
  </div>
);

export default WorkflowChunk;
