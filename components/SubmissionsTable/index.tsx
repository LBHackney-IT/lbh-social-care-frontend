import { useState } from 'react';
import { Submission } from 'data/flexibleForms/forms.types';
import SubmissionRow from './SubmissionRow';
import { useAuth } from 'components/UserContext/UserContext';
import { User } from 'types';
import s from './index.module.scss';
import Filter from './Filter';
import SearchBox from './SearchBox';

interface ResultsProps {
  filteredSubmissions: Submission[];
  user: User;
}

const Results = ({
  filteredSubmissions,
  user,
}: ResultsProps): React.ReactElement => {
  const [openRow, setOpenRow] = useState<string | false>(false);

  if (!filteredSubmissions || filteredSubmissions.length === 0)
    return <p>No unfinished submissions to show.</p>;

  return (
    <>
      <p className="lbh-body-xs">
        Showing {filteredSubmissions.length} unfinished{' '}
        {filteredSubmissions.length > 1 ? 'submissions' : 'submission'}
      </p>

      <ul className={`lbh-list govuk-!-margin-bottom-8 ${s.list}`}>
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

interface Props {
  submissions: Submission[];
}

export const SubmissionsTable = ({
  submissions,
}: Props): React.ReactElement => {
  const { user } = useAuth();

  const [filter, setFilter] = useState<string>('mine');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSubmissions =
    filter === 'mine'
      ? submissions.filter(
          (submission) => submission.createdBy.email === user?.email
        )
      : submissions;

  return (
    <>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <fieldset className="govuk-radios govuk-radios--inline lbh-radios">
        <Filter value="mine" filter={filter} setFilter={setFilter}>
          Just mine
        </Filter>
        <Filter value="all" filter={filter} setFilter={setFilter}>
          All
        </Filter>
      </fieldset>

      <Results user={user as User} filteredSubmissions={filteredSubmissions} />
    </>
  );
};

export default SubmissionsTable;
