import { useState } from 'react';
import { Submission } from 'data/flexibleForms/forms.types';
import Link from 'next/link';
import { useAuth } from 'components/UserContext/UserContext';
import { format } from 'date-fns';
import forms from 'data/flexibleForms';

interface RowProps {
  submission: Submission;
  openRow: string | false;
  setOpenRow: (value: string | false) => void;
}

const SubmissionRow = ({
  submission,
  openRow,
  setOpenRow,
}: RowProps): React.ReactElement => {
  const form = forms.find((form) => form.id === submission.formId);

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
        <dd>{form?.name}</dd>
        <dt>Last edited</dt>
        <dd>{format(new Date(submission.createdAt), 'dd MMM yyyy')}</dd>
      </dl>

      <Link href={`/submissions/${submission.submissionId}`}>
        <a className="govuk-button lbh-button">Continue</a>
      </Link>

      <button
        onClick={() =>
          setOpenRow(
            openRow === submission.submissionId
              ? false
              : submission.submissionId
          )
        }
      >
        {openRow === submission.submissionId ? 'Close' : 'Open'}
      </button>
    </li>
  );
};

interface FilterProps {
  value: string;
  children: React.ReactChild;
  filter: string;
  setFilter: (value: string) => void;
}

const Filter = ({
  value,
  children,
  filter,
  setFilter,
}: FilterProps): React.ReactElement => (
  <div className="govuk-radios__item">
    <input
      type="radio"
      className="govuk-radios__input"
      onChange={() => setFilter(value)}
      checked={filter === value}
      id={`filter-${value}`}
    />
    <label htmlFor="filter-mine" className="govuk-label govuk-radios__label">
      {children}
    </label>
  </div>
);

interface Props {
  submissions: Submission[];
}

export const SubmissionsTable = ({
  submissions,
}: Props): React.ReactElement => {
  const { user } = useAuth();

  const [filter, setFilter] = useState<string>('mine');
  const [openRow, setOpenRow] = useState<string | false>(false);

  const filteredSubmissions =
    filter === 'mine'
      ? submissions.filter(
          (submission) => submission.createdBy.email === user?.email
        )
      : submissions;

  if (!filteredSubmissions || filteredSubmissions.length === 0)
    return <p>No unfinished submissions to show.</p>;

  return (
    <>
      <p>
        Showing {filteredSubmissions.length} unfinished{' '}
        {filteredSubmissions.length > 1 ? 'submissions' : 'submission'}
      </p>

      <fieldset className="govuk-radios govuk-radios--inline lbh-radios">
        <Filter value="mine" filter={filter} setFilter={setFilter}>
          Just mine
        </Filter>
        <Filter value="all" filter={filter} setFilter={setFilter}>
          All
        </Filter>
      </fieldset>

      <ul className="lbh-list">
        {filteredSubmissions?.length > 0 &&
          filteredSubmissions.map((submission) => (
            <SubmissionRow
              submission={submission}
              key={submission.submissionId}
              openRow={openRow}
              setOpenRow={setOpenRow}
            />
          ))}
      </ul>
    </>
  );
};

export default SubmissionsTable;
