import DiscardDialog from './DiscardDialog';
import MiniRevisionTimeline from 'components/RevisionTimeline/MiniRevisionTimeline';
import Dialog from 'components/Dialog/Dialog';
import { Form, InProgressSubmission } from 'data/flexibleForms/forms.types';
import { format } from 'date-fns';
import Link from 'next/link';
import s from './index.module.scss';

interface Props {
  submission: InProgressSubmission;
  isOpen: boolean;
  onDismiss: () => void;
  form?: Form;
  completedSteps?: number;
  totalSteps?: number;
  completion?: number;
  url: string;
}

const SubmissionDetailDialog = ({
  submission,
  isOpen,
  onDismiss,
  form,
  completedSteps,
  totalSteps,
  completion,
  url,
}: Props): React.ReactElement => {
  const editors = submission.workers.map((worker) => worker.email);

  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={onDismiss}
      title={`${form?.name || 'Unknown form'} details`}
    >
      <dl className={`govuk-summary-list lbh-summary-list ${s.dl}`}>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Progress</dt>
          <dd className="govuk-summary-list__value">
            {completedSteps === totalSteps ? (
              'Ready to finish'
            ) : (
              <>
                {completedSteps || '0'} of {totalSteps} sections ({completion}%)
              </>
            )}
            <br />
            <Link href={url}>
              <a className="lbh-link lbh-link--no-visited-state">Resume</a>
            </Link>{' '}
            <DiscardDialog submissionId={submission.submissionId} />
          </dd>
        </div>

        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Residents</dt>
          <dd className="govuk-summary-list__value">
            <ul className="lbh-list">
              {submission.residents.map((res) => (
                <li key={res.id}>
                  <Link href={`/people/${res.id}`}>
                    <a className="lbh-link lbh-link--no-visited-state">
                      {res.firstName} {res.lastName}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </dd>
        </div>

        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Started</dt>
          <dd className="govuk-summary-list__value">
            {format(new Date(submission.createdAt), 'd MMM yyyy K.mm aaa')}
          </dd>
        </div>

        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Last edited</dt>
          <dd className="govuk-summary-list__value">
            {format(new Date(submission.lastEdited), 'd MMM yyyy K.mm aaa')}
          </dd>
        </div>

        {editors?.length > 0 && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Editors</dt>
            <dd className="govuk-summary-list__value">
              <ul className="lbh-list govuk-!-margin-top-0">
                {editors.map((editor) => (
                  <li key={editor}>{editor}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}

        <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
          <dt className="govuk-summary-list__key">Recent revisions</dt>
          <dd className="govuk-summary-list__value">
            <MiniRevisionTimeline submission={submission} />
          </dd>
        </div>
      </dl>
    </Dialog>
  );
};

export default SubmissionDetailDialog;
