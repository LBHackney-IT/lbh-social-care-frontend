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
  const completion = Math.round((completedSteps / Number(totalSteps)) * 100);

  const lastEdited =
    submission.editHistory[submission.editHistory.length - 1]?.editTime;

  const editors = submission.workers
    .map((worker) => worker.email)
    .filter((editor) => editor !== user.email);

  return (
    <>
      <li className={s.row} aria-expanded={open}>
        <div className={s.person}>
          <h3 className={s.name}>{form?.name || 'Unknown form'}</h3>
          <p className={`lbh-body-xs govuk-!-margin-top-1 ${s.meta}`}>
            For{' '}
            <Link href={`/people/${submission.residents[0].id}`}>
              <a className="lbh-link lbh-link--muted ">
                {submission.residents[0].firstName}{' '}
                {submission.residents[0].lastName}
              </a>
            </Link>{' '}
            ·{' '}
            <button
              className="lbh-link lbh-link--muted"
              onClick={() => setOpenRow(submission.submissionId)}
            >
              Details
            </button>
          </p>
        </div>

        <dl className={`lbh-body-s ${s.stats}`}>
          <div>
            <dd>{completion}%</dd>
            <dt>completed</dt>
          </div>
          <div>
            <dd>{format(new Date(submission.createdAt), 'd MMM yyyy')}</dd>
            <dt>last edited</dt>
          </div>
        </dl>

        <Link href={`/submissions/${submission.submissionId}`}>
          <a className="govuk-button lbh-button">Resume</a>
        </Link>

        <div className={s.meter}>
          <div style={{ width: `${completion}%` }}></div>
        </div>
      </li>
    </>
  );
};

export default SubmissionRow;
