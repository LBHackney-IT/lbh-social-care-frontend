import Tip from 'components/Tip/Tip';
import useWorkflowIds from 'hooks/useWorkflowIds';
import { WorkflowType } from './types';
import s from './WorkflowInfoBadge.module.scss';

interface Props {
  workflowId?: string;
}

export const WorkflowInfoBadge = ({
  workflowId,
}: Props): React.ReactElement => {
  const { data, error } = useWorkflowIds(workflowId);

  if (!data && !error) {
    return <></>;
  } else {
    return (
      <div className={s.badge}>
        {(data?.workflow.type === WorkflowType.Review ||
          data?.workflow.type === WorkflowType.Reassessment) && (
          <span className="govuk-tag lbh-tag" data-testid="workflow-info">
            {data?.workflow.type}
          </span>
        )}

        {workflowId && error && (
          <Tip content="There is workflow data that can not be retrieved currently">
            <span
              className="govuk-tag lbh-tag lbh-tag--grey"
              data-testid="workflow-info"
            >
              Unknown workflow type
            </span>
          </Tip>
        )}
      </div>
    );
  }
};

export default WorkflowInfoBadge;
