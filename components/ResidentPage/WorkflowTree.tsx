import Link from 'next/link';
import { Workflow, WorkflowType } from 'components/ResidentPage/types';
import { useMemo } from 'react';
import s from './WorkflowTree.module.scss';
import { formatDate } from 'utils/date';
import { prettyStatus } from 'lib/workflows/status';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from 'components/UserContext/UserContext';
import { canManageCases } from 'lib/permissions';
import { Resident } from 'types';

interface Props {
  workflows: Workflow[];
  resident: Resident;
  summarise?: boolean;
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
        Started {formatDate(w.createdAt.toString())} · {prettyStatus(w)}
      </p>

      <p className="lbh-body-xs">
        {w.assignee
          ? `Assigned to ${w.assignee.name || w.assignee.email}`
          : 'Unassigned'}
      </p>
    </li>
  );
};

const WorkflowTree = ({
  workflows,
  resident,
  summarise,
}: Props): React.ReactElement => {
  const { user } = useAuth();

  const reverseChronological = workflows.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  );
  const workflowsBegan =
    reverseChronological[reverseChronological.length - 1].createdAt;

  const tree = useMemo(
    () => convertWorkflowsToTree(reverseChronological),
    [reverseChronological]
  );

  if (user && !canManageCases(user, resident))
    return (
      <p>
        You don&apos;t have permission to see this resident&apos;s workflows.
      </p>
    );

  if (summarise)
    return (
      <div className="govuk-grid-row">
        <ul className={`govuk-grid-column-three-quarters ${s.tree}`}>
          {tree?.map((w) => (
            <Node w={w} key={w.id} />
          ))}
        </ul>
        <aside className={`govuk-grid-column-one-quarter ${s.summaryPanel}`}>
          <p className="lbh-body-xs">
            {workflows.length} workflows started over{' '}
            {formatDistanceToNow(new Date(workflowsBegan))}
          </p>
          <p className="lbh-body-xs govuk-!-margin-top-1">
            <a
              className="lbh-link lbh-link--no-visited-state"
              href={`${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}?quick_filter=all&social_care_id=${resident.id}&touched_by_me=true`}
            >
              See on planner
            </a>
          </p>
        </aside>
      </div>
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

export const WorkflowNodeSkeleton = (): React.ReactElement => (
  <div className={s.nodeSkeleton} aria-hidden="true">
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export const WorkflowTreeSkeleton = (): React.ReactElement => (
  <div aria-label="Loading...">
    <WorkflowNodeSkeleton />
    <WorkflowNodeSkeleton />
    <WorkflowNodeSkeleton />
    <WorkflowNodeSkeleton />
  </div>
);
