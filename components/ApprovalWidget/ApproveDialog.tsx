import { useState } from 'react';
import Dialog from 'components/Dialog/Dialog';
import axios from 'axios';
import { Submission } from 'data/flexibleForms/forms.types';
import Banner from 'components/FlexibleForms/Banner';

interface Props {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  submission: Submission;
}

const ApproveDialog = ({
  submission,
  isOpen,
  setOpen,
}: Props): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | false>(false);

  const handleApprove = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/submissions/${submission.submissionId}/approvals`);
      window.location.reload;
    } catch (e) {
      setStatus(e.toString());
    }
  };

  return (
    <Dialog
      title="Are you sure you want to approve this submission?"
      isOpen={isOpen}
      onDismiss={() => setOpen(false)}
    >
      <>
        {status && (
          <Banner
            title="There was a problem approving the submission"
            className="lbh-page-announcement--warning"
          >
            <p>Please refresh the page or try again later.</p>
            <p className="lbh-body-xs">{status}</p>
          </Banner>
        )}
        <p>Approved submissions can no longer be edited.</p>
        <p>
          If you&apos;re not sure what this means, check with a manager first.
        </p>
        <button
          className="govuk-button lbh-button"
          onClick={handleApprove}
          disabled={loading}
        >
          Yes, approve
        </button>
      </>
    </Dialog>
  );
};

export default ApproveDialog;
