import Link from 'next/link';
import { Workflow, WorkflowType } from 'components/ResidentPage/types';
import { useMemo } from 'react';
import s from './WorkflowTree.module.scss';
import { formatDate } from 'utils/date';

interface Props {
  workflows: Workflow[];
}

interface WorkflowWithChildren extends Workflow {
  children?: WorkflowWithChildren[];
}

const gatherChildren = (
  workflow: Workflow,
  workflows: Workflow[]
): WorkflowWithChildren => {
  return {
    ...workflow,
    children: workflows
      .filter((w) => w.workflowId === workflow.id)
      .map((x) => gatherChildren(x, workflows)),
  };
};

const convertWorkflowsToTree = (
  workflows: Workflow[]
): WorkflowWithChildren[] => {
  const topLevel = workflows.filter((w) => !w.workflowId);
  return topLevel.map((w) => gatherChildren(w, workflows));
};

const Node = ({ w }: { w: WorkflowWithChildren }) => {
  const hasChildren = w?.children && w?.children?.length > 0;

  return (
    <li className={hasChildren ? s.nodeWithChildren : s.node}>
      {hasChildren && (
        <ul>
          {w.children?.map((c) => (
            <Node key={c.id} w={c} />
          ))}
        </ul>
      )}

      <Link
        href={`${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}/workflows/${w.id}`}
      >
        {w?.form?.name || w.formId}
      </Link>

      {w.type === WorkflowType.Reassessment && (
        <span className="govuk-tag lbh-tag">Reassessment</span>
      )}

      <p className="lbh-body-xs">
        Started {formatDate(w.createdAt.toString())}
      </p>

      <p className="lbh-body-xs">
        {w.assignee
          ? `Assigned to ${w.assignee.name || w.assignee.email}`
          : 'Unassigned'}
      </p>
    </li>
  );
};

const WorkflowTree = ({ workflows }: Props): React.ReactElement => {
  const reverseChronological = workflows.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  );

  const tree = useMemo(
    () => convertWorkflowsToTree(reverseChronological),
    [reverseChronological]
  );

  return (
    <ul className={s.tree}>
      {tree?.map((w) => (
        <Node w={w} key={w.id} />
      ))}
    </ul>
  );
};

export default WorkflowTree;
