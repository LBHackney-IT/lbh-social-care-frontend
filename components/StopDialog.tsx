import { useEffect, useState } from 'react';
import Dialog from 'components/Dialog/Dialog';
import s from 'stylesheets/StopDialog.module.scss';

const StopDialog = (): React.ReactElement | null => {
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => setOpen(true), []);

  const handleDismiss = async () => {
    setOpen(false);
  };

  if (isOpen)
    return (
      <Dialog
        title="You shouldn't record here anymore"
        isOpen={true}
        onDismiss={() => setOpen(false)}
        showCloseButton={false}
        className={s.stopDialog}
      >
        <>
          <p>
            If you are a CFS worker all of your work must be recorded on Mosaic.
          </p>
          <p className="govuk-!-margin-top-3">
            If you are an ASC worker and need to record something about this
            resident you need to first change the service context.
          </p>

          <button
            onClick={handleDismiss}
            className="govuk-button lbh-button lbh-button--danger"
          >
            I understand, continue
          </button>
        </>
      </Dialog>
    );

  return null;
};

export default StopDialog;
