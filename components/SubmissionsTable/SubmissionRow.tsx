import { Submission } from 'data/flexibleForms/forms.types';
import Link from 'next/link';
import { format } from 'date-fns';
import forms from 'data/flexibleForms';
import { User } from 'types';
import s from './index.module.scss';
import DiscardDialog from './DiscardDialog';
import MiniRevisionTimeline from 'components/RevisionTimeline/MiniRevisionTimeline';

interface Props {
  submission: Submission;
  openRow: string | false;
  setOpenRow: (value: string | false) => void;
  user: User;
}

const SubmissionRow = ({
  submission,
  openRow,
  setOpenRow,
  user,
}: Props): React.ReactElement | null => {
  const open = openRow === submission.submissionId;

  const form = forms.find((form) => form.id === submission.formId);

  const completedSteps = Object.keys(submission.formAnswers).length;
  const totalSteps = form?.steps?.length;

  const lastEdited =
    submission.editHistory[submission.editHistory.length - 1]?.editTime;

  const editors = submission.workers
    .map((worker) => worker.email)
    .filter((editor) => editor !== user.email);

  return (
    <>
      <li className={s.row} aria-expanded={open}>
        <div className={s.person}>
          <h3 className={s.name}>
            <Link href={`/people/${submission.residents[0].id}`}>
              <a className="lbh-link lbh-link--no-visited-state">
                {submission.residents[0].firstName}{' '}
                {submission.residents[0].lastName}
              </a>
            </Link>
          </h3>
          <p className={`lbh-body-xs govuk-!-margin-top-1`}>
            #{submission.residents[0].id}
          </p>
        </div>

        <dl className={`lbh-body-s ${s.meta}`}>
          <dt>Form</dt>{' '}
          <dd>
            <Link href={`/submissions/${submission.submissionId}`}>
              <a className="lbh-link">{form?.name || submission.formId}</a>
            </Link>
          </dd>
          <br />
          <dt>Last edited</dt>{' '}
          <dd>{format(new Date(submission.createdAt), 'dd MMM yyyy')}</dd>
        </dl>

        <button
          className={s.expanderButton}
          onClick={() => setOpenRow(open ? false : submission.submissionId)}
        >
          <svg width="15" height="15" viewBox="0 0 13 13" fill="none">
            <rect y="5.41675" width="13" height="2.16667" fill="#0B0C0C" />
            {!open && (
              <rect
                x="5.41663"
                y="13"
                width="13"
                height="2.16667"
                transform="rotate(-90 5.41663 13)"
                fill="#0B0C0C"
              />
            )}
          </svg>

          <span className="govuk-visually-hidden">
            {open ? 'Hide details' : 'Expand details'}
          </span>
        </button>
      </li>

      {open && (
        <dl className={`${s.detailsPanel}`}>
          <div>
            <dt className="lbh-body-s">Last edited</dt>
            <dd>{format(new Date(lastEdited), 'dd MMM yyyy K.mm aaa')}</dd>
          </div>

          <div>
            <dt className="lbh-body-s">Started</dt>
            <dd>
              {format(new Date(submission.createdAt), 'dd MMM yyyy K.mm aaa')}
            </dd>
          </div>

          <div>
            <dt className="lbh-body-s">Progress</dt>
            <dd>
              {completedSteps === totalSteps ? (
                'Ready to finish'
              ) : (
                <>
                  {completedSteps || '0'} of {totalSteps} sections (
                  {Math.round((completedSteps / Number(totalSteps)) * 100)}
                  %)
                </>
              )}
            </dd>
          </div>

          {editors?.length > 0 && (
            <div>
              <dt className="lbh-body-s">Edited by</dt>
              <dd>
                <ul className="lbh-list govuk-!-margin-top-0">
                  {editors.map((editor) => (
                    <li key={editor}>{editor}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}

          <div className={s.timeline}>
            <dt className="lbh-body-s">Recent revisions</dt>
            <dd>
              <MiniRevisionTimeline submission={submission} />
            </dd>
          </div>

          <div>
            <DiscardDialog submissionId={submission.submissionId} />
          </div>
        </dl>
      )}
    </>
  );
};

export default SubmissionRow;
