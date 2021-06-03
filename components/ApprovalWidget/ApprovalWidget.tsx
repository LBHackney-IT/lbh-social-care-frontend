import { Submission } from 'data/flexibleForms/forms.types';
import type { User } from 'types';

interface Props {
  submission: Submission;
  user: User;
}

const ApprovalWidget = ({ user, submission }: Props): React.ReactElement => {
  const handleApprove = () => {
    // TODO: handle approve operation
  };

  if (submission.approvedAt) {
    return <p>This submission was approved.</p>;
  }

  if (submission.createdBy === user.email) {
    return <p>You need to ask someone else to approve this submission.</p>;
  }

  return <button onClick={handleApprove}>Approve</button>;
};

export default ApprovalWidget;
