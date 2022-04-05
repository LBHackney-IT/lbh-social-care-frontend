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
        title="You shouldn't make edits here any more"
        isOpen={true}
        onDismiss={() => setOpen(false)}
        showCloseButton={false}
        className={s.stopDialog}
      >
        <>
          <p>
            This is a child resident, so you must only use Mosaic for them from
            now on.
          </p>
          <p className="govuk-!-margin-top-3">
            The only exception is if you&apos;re about to turn this resident
            into an adult.
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
