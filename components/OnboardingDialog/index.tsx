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
        title="Good news! You're part of the brand new workflow pilot."
        isOpen={true}
        onDismiss={() => setOpen(false)}
        showCloseButton={false}
      >
        <>
          <p>You can:</p>
          <ul className="lbh-list lbh-list--bullet">
            <li>
              Work collaboratively on a radically streamlined set of assessment
              forms
            </li>
            <li>Take workflows through a manager and panel approval flow</li>
            <li>Re-assess residents with a new side-by-side interface</li>
          </ul>
          <p>
            For the moment, only a small number of users are previewing these
            features, but we&apos;ll be rolling them out further soon.
          </p>

          <div className="lbh-dialog__actions">
            <a
              href="https://sites.google.com/hackney.gov.uk/moderntoolsforsocialcare/core-pathway-pilot"
              onClick={handleDismiss}
              className="govuk-button lbh-button"
              target="_blank"
              rel="noreferrer noopener"
            >
              Okay, show me
            </a>
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
