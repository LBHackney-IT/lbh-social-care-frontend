import { useEffect, useState } from 'react';
import Dialog from 'components/Dialog/Dialog';

const OnboardingDialog = (): React.ReactElement | null => {
  const key = 'seen-workflows-pilot-onboarding';

  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (window?.localStorage?.getItem(key) === null) setOpen(true);
  }, []);

  const handleDismiss = async () => {
    window?.localStorage?.setItem(key, '');
    setOpen(false);
  };

  if (isOpen)
    return (
      <Dialog
        title="You are part of the workflows pilot"
        isOpen={true}
        onDismiss={() => setOpen(false)}
        showCloseButton={false}
      >
        <>
          <p>More information about the pilot here.</p>
          <p>You can:</p>
          <ul className="lbh-list lbh-list--bullet">
            <li>Do foo</li>
            <li>Do bar</li>
            <li>Do something else</li>
          </ul>

          <div className="lbh-dialog__actions">
            <button className="govuk-button lbh-button" onClick={handleDismiss}>
              Show me
            </button>
            <button className="lbh-link" onClick={handleDismiss}>
              Got it, dismiss
            </button>
          </div>
        </>
      </Dialog>
    );

  return null;
};

export default OnboardingDialog;
