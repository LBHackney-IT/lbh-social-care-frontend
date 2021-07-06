import { Submission } from 'data/flexibleForms/forms.types';
import type { User } from 'types';
import Banner from 'components/FlexibleForms/Banner';

interface Props {
  submission: Submission;
  user: User;
}

const ApprovalWidget = ({ user, submission }: Props): React.ReactElement => {
  // if (submission.createdBy.email === user.email) {
  //   return (
  //     <Banner
  //       title="This submission needs approval"
  //       className="lbh-page-announcement--info"
  //     >
  //       You cannot approve your own submissions. Ask a manager or colleague for
  //       help.
  //     </Banner>
  //   );
  // }

  const handleApprove = () => {
    // TODO: handle approve operation
  };

  const handleReturnForEdits = () => {
    // TODO: handle operation
  };

  return (
    <Banner
      title="This submission needs approval"
      className="lbh-page-announcement--info"
    >
      <p>Do you want to approve it?</p>
      <button className="lbh-link" onClick={handleApprove}>
        Yes, approve
      </button>{' '}
      <button
        className="lbh-link lbh-link--danger"
        onClick={handleReturnForEdits}
      >
        No, return for edits
      </button>
    </Banner>
  );
};

export default ApprovalWidget;
