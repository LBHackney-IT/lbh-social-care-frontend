import useWorkflowIds from 'hooks/useWorkflowIds';
import s from './WorkflowInfoBadge.module.scss';

export const WorkflowInfoBadge = (workflowId?: string): React.ReactElement => {
  //Get workflow assessment type
  const { data, error } = useWorkflowIds(workflowId, 1000);

  return (
    <div className={s.badge}>
      <span
        className="govuk-tag lbh-tag lbh-tag--grey"
        data-testid="workflow-info"
      >
        Unknown
      </span>
    </div>
  );
};

export default WorkflowInfoBadge;
