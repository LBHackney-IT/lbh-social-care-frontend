import { useState } from 'react';
import { Submission } from 'data/flexibleForms/forms.types';
import type { User } from 'types';
import Banner from 'components/FlexibleForms/Banner';
import PanelApproveDialog from './PanelApproveDialog';
import RejectDialog from './RejectDialog';
import s from './ApprovalWidget.module.scss';

interface Props {
  submission: Submission;
  user: User;
}

const PanelApprovalWidget = ({
  user,
  submission,
}: Props): React.ReactElement | null => {
  const [approvalDialogOpen, setApprovalDialogOpen] = useState<boolean>(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState<boolean>(false);

  if (submission.submissionState !== 'Approved') return null;

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
        title="This submission needs panel approval"
        className="lbh-page-announcement--info"
      >
        <p>Has the panel approved this work?</p>

        <div className={s.actions}>
          <button
            className="lbh-link"
            onClick={() => setApprovalDialogOpen(true)}
          >
            Yes, panel has approved
          </button>
          <button
            className="lbh-link lbh-link--danger"
            onClick={() => setRejectDialogOpen(true)}
          >
            No, return for edits
          </button>
        </div>
      </Banner>

      <PanelApproveDialog
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

export default PanelApprovalWidget;
