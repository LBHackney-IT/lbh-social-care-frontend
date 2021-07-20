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

const PanelApproveDialog = ({
  submission,
  isOpen,
  setOpen,
}: Props): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const handleApprove = async () => {
    try {
      setLoading(true);
      await axios.post(
        `/api/submissions/${submission.submissionId}/panelApprovals`
      );
      setLoading(false);
      setOpen(false);
    } catch (e) {
      setStatus(e.toString());
    }
  };

  return (
    <Dialog
      title="Are you sure you want to mark this submission as panel approved?"
      isOpen={isOpen}
      onDismiss={() => setOpen(false)}
    >
      {status && (
        <Banner
          title="There was a problem approving the submission"
          className="lbh-page-announcement--warning"
        >
          <p>Please refresh the page or try again later.</p>
          <p className="lbh-body-xs">{status}</p>
        </Banner>
      )}

      <div className="govuk-checkboxes lbh-checkboxes">
        <div className="govuk-checkboxes__item">
          <input
            className="govuk-checkboxes__input"
            id="panel-approval"
            name="panel-approval"
            type="checkbox"
            value="panel-approved"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          ></input>
          <label
            className="govuk-label govuk-checkboxes__label"
            htmlFor="panel-approval"
          >
            The panel met and approved this work
          </label>
        </div>
      </div>
      <button
        className="govuk-button lbh-button"
        onClick={handleApprove}
        disabled={loading || !confirmed}
      >
        Yes, approve
      </button>
    </Dialog>
  );
};

export default PanelApproveDialog;
