import { Submission } from 'data/flexibleForms/forms.types';
import Link from 'next/link';
import { format } from 'date-fns';
import forms from 'data/flexibleForms';
import { User } from 'types';

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
}: Props): React.ReactElement => {
  const open = openRow === submission.submissionId;

  const form = forms.find((form) => form.id === submission.formId);

  const completedSteps = Object.keys(submission.formAnswers).length;
  const totalSteps = form?.steps?.length;

  const lastEdited =
    submission.editHistory[submission.editHistory.length - 1].editTime;

  const editors = [
    ...new Set(submission.editHistory.map((edit) => edit.worker.email)),
  ].filter((editor) => editor !== user.email);

  return (
    <li>
      <Link href={`/people/${submission.residents[0].id}`}>
        <a className="lbh-link">
          <h3>
            {submission.residents?.[0]?.firstName}{' '}
            {submission.residents?.[0]?.lastName}
          </h3>
        </a>
      </Link>
      <p>{submission.residents[0].id}</p>

      <dl className="lbh-body-s">
        <dt>Form</dt>
        <dd>
          <Link href={`/submissions/${submission.submissionId}`}>
            <a className="lbh-link">{form?.name}</a>
          </Link>
        </dd>
        <dt>Last edited</dt>
        <dd>{format(new Date(submission.createdAt), 'dd MMM yyyy')}</dd>
      </dl>

      <button
        onClick={() => setOpenRow(open ? false : submission.submissionId)}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
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

      {open && (
        <dl>
          <dt>Last edited</dt>
          <dd>{format(new Date(lastEdited), 'dd MMM yyyy K.mm aaa')}</dd>
          <dt>Started</dt>
          <dd>
            {format(new Date(submission.createdAt), 'dd MMM yyyy K.mm aaa')}
          </dd>
          <dt>Progress</dt>
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
          {editors?.length > 0 && (
            <>
              <dt>Edited by</dt>
              <dd>
                <ul>
                  {editors.map((editor) => (
                    <li key={editor}>{editor}</li>
                  ))}
                </ul>
              </dd>
            </>
          )}
        </dl>
      )}
    </li>
  );
};

export default SubmissionRow;
