import Dialog from 'components/Dialog/Dialog';
import { useState } from 'react';
import Banner from 'components/FlexibleForms/Banner';
import s from './DiscardDialog.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
  submissionId: string;
}

const DiscardDialog = ({ submissionId }: Props): React.ReactElement => {
  const [status, setStatus] = useState<string | false>(false);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleDiscard = async (): Promise<void> => {
    try {
      const { data } = await axios.delete(`/api/submissions/${submissionId}`);
      if (data.error) throw data.error;
      router.reload();
    } catch (e) {
      setStatus(e.toString());
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`lbh-link  ${s.discardLink}`}
      >
        Discard
      </button>
      <Dialog
        title="Are you sure you want to discard this submission?"
        isOpen={open}
        onDismiss={() => setOpen(false)}
      >
        <>
          {status && (
            <Banner
              title="There was a problem discarding this submission"
              className="lbh-page-announcement--warning"
            >
              <p>Please refresh the page or try again later.</p>
              <p className="lbh-body-xs">{status}</p>
            </Banner>
          )}

          <p className="lbh-body">
            This will remove it for you and your colleagues.
          </p>

          <div className="lbh-dialog__actions">
            <button className="govuk-button lbh-button" onClick={handleDiscard}>
              Yes, discard
            </button>

            <button
              className="govuk-link lbh-link"
              onClick={() => setOpen(false)}
            >
              No, cancel
            </button>
          </div>
        </>
      </Dialog>
    </>
  );
};

export default DiscardDialog;
