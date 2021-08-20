import { useState, useMemo } from 'react';
import { InProgressSubmission } from 'data/flexibleForms/forms.types';
import Link from 'next/link';
import { format } from 'date-fns';
import s from './index.module.scss';
import SubmissionDetailDialog from './SubmissionDetailDialog';
import { generateSubmissionUrl } from 'lib/submissions';

interface Props {
  submission: InProgressSubmission;
}

const SubmissionPanel = ({ submission }: Props): React.ReactElement | null => {
  const [open, setOpen] = useState<boolean>(false);

  const form = submission.form;
  const totalSteps = form?.steps?.length;
  const completion =
    Math.round((submission.completedSteps / Number(totalSteps)) * 100) || 0;

  const url = useMemo(() => generateSubmissionUrl(submission), [submission]);

  return (
    <>
      <li className={s.row}>
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
            {submission.residents.length === 2 && ` and 1 other `}
            {submission.residents.length > 2 &&
              ` and ${submission.residents.length - 1} others `}
            ·{' '}
            <button
              className="lbh-link lbh-link--muted"
              onClick={() => setOpen(true)}
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

        <Link href={url}>
          <a className="govuk-button lbh-button">Resume</a>
        </Link>

        <div className={s.meter}>
          <div style={{ width: `${completion}%` }}></div>
        </div>

        <SubmissionDetailDialog
          isOpen={open}
          onDismiss={() => setOpen(false)}
          submission={submission}
          form={form}
          completedSteps={submission.completedSteps}
          totalSteps={totalSteps}
          completion={completion}
          url={url}
        />
      </li>
    </>
  );
};

export default SubmissionPanel;
