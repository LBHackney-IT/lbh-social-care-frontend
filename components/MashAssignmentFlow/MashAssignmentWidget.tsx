import Dialog from './../Dialog/Dialog';
import { useState } from 'react';
import { MashReferral } from 'types';
import { AxiosError } from 'axios';
import Button from 'components/Button/Button';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

interface Props {
  mashReferral: MashReferral;
  assignWorkerToReferral: (referralId: number, workerId: number) => void;
}

const MashAssignmentWidget = ({
  mashReferral,
  assignWorkerToReferral,
}: Props): React.ReactElement => {
  // fetch all the workers from relevant teams (needs a backend update)
  // select to choose a worker
  // assignWorkerToReferral to be given worker id

  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | undefined>(
    undefined
  );

  const submitForm = async () => {
    setSubmitting(true);
    setErrorMessage('');

    try {
      await assignWorkerToReferral(mashReferral.id, 3);
      setSubmitting(false);
      setDialogOpen(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      setSubmitting(false);
      setErrorMessage(axiosError.response?.data);
    }
  };

  return (
    <section>
      <button className={`lbh-link`} onClick={() => setDialogOpen(true)}>
        Assign
      </button>

      <Dialog
        title="Assign contact"
        isOpen={dialogOpen}
        onDismiss={() => setDialogOpen(false)}
      >
        <div className="govuk-form-group lbh-form-group">
          <label className="govuk-label lbh-label" htmlFor="query">
            Select worker{' '}
          </label>
          <div className="lbh-search-box" style={{ marginTop: 0 }}>
            <input
              className="govuk-input lbh-input"
              id="query"
              name="query"
              type="search"
              placeholder="Type worker's name"
            />
            <button className="lbh-search-box__action">
              <span className="govuk-visually-hidden">Search</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.6999 10.6C12.0747 10.6 13.9999 8.67482 13.9999 6.3C13.9999 3.92518 12.0747 2 9.6999 2C7.32508 2 5.3999 3.92518 5.3999 6.3C5.3999 8.67482 7.32508 10.6 9.6999 10.6ZM9.6999 12.6C13.1793 12.6 15.9999 9.77939 15.9999 6.3C15.9999 2.82061 13.1793 0 9.6999 0C6.22051 0 3.3999 2.82061 3.3999 6.3C3.3999 9.77939 6.22051 12.6 9.6999 12.6Z"
                  fill="#0B0C0C"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.70706 10.7071L1.70706 15.7071L0.292847 14.2929L5.29285 9.29289L6.70706 10.7071Z"
                  fill="#0B0C0C"
                />
              </svg>
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            label="Submit"
            type="submit"
            onClick={submitForm}
            disabled={submitting}
          />
          <p className="lbh-body">
            <a
              href="#"
              className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-3`}
            >
              Cancel
            </a>
          </p>
        </div>
        {errorMessage && <ErrorMessage label={errorMessage} />}
      </Dialog>
    </section>
  );
};

export default MashAssignmentWidget;
