import { useState } from 'react';
import { Submission } from 'data/flexibleForms/forms.types';
import SubmissionRow from './SubmissionRow';
import { useAuth } from 'components/UserContext/UserContext';
import { User } from 'types';

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
      name="filter"
      type="radio"
      className="govuk-radios__input"
      onChange={() => setFilter(value)}
      checked={filter === value}
      id={`filter-${value}`}
    />
    <label
      htmlFor={`filter-${value}`}
      className="govuk-label govuk-radios__label"
    >
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
              user={user as User}
            />
          ))}
      </ul>
    </>
  );
};

export default SubmissionsTable;
