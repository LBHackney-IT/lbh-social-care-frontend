import { useState } from 'react';
import { Submission } from 'data/flexibleForms/forms.types';
import type { User } from 'types';
import Banner from 'components/FlexibleForms/Banner';
import ApproveDialog from './ApproveDialog';
import RejectDialog from './RejectDialog';
import s from './ApprovalWidget.module.scss';

interface Props {
  submission: Submission;
  user: User;
}

const ApprovalWidget = ({
  user,
  submission,
}: Props): React.ReactElement | null => {
  const [approvalDialogOpen, setApprovalDialogOpen] = useState<boolean>(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState<boolean>(false);

  if (submission.submissionState !== 'Submitted') return null;

  if (submission.createdBy.email === user.email) {
    return (
      <Banner
        title="This submission needs approval"
        className="lbh-page-announcement--info"
      >
        You cannot approve your own submissions. Ask a manager or colleague for
        help.
      </Banner>
    );
  }

  return (
    <>
      <Banner
        title="This submission needs approval"
        className="lbh-page-announcement--info"
      >
        <p>Do you want to approve it?</p>

        <div className={s.actions}>
          <button
            className="lbh-link"
            onClick={() => setApprovalDialogOpen(true)}
          >
            Yes, approve
          </button>
          <button
            className="lbh-link lbh-link--danger"
            onClick={() => setRejectDialogOpen(true)}
          >
            No, return for edits
          </button>
        </div>
      </Banner>

      <ApproveDialog
        isOpen={approvalDialogOpen}
        setOpen={setApprovalDialogOpen}
        submission={submission}
      />
      <RejectDialog
        isOpen={rejectDialogOpen}
        setOpen={setRejectDialogOpen}
        submission={submission}
      />
    </>
  );
};

export default ApprovalWidget;
