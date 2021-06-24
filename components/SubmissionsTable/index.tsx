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
  searchQuery: string;
}

const Results = ({
  filteredSubmissions,
  user,
  searchQuery,
}: ResultsProps): React.ReactElement => {
  const [openRow, setOpenRow] = useState<string | false>(false);

  if (filteredSubmissions.length === 0 && searchQuery)
    return (
      <p className="lbh-body-xs">No unfinished submissions match your search</p>
    );

  if (!filteredSubmissions || filteredSubmissions.length === 0)
    return <p className="lbh-body-xs">No unfinished submissions to show</p>;

  return (
    <>
      {searchQuery ? (
        <p className="lbh-body-xs">
          {filteredSubmissions.length} unfinished{' '}
          {filteredSubmissions.length > 1 ? 'submissions' : 'submission'} match
          your search
        </p>
      ) : (
        <p className="lbh-body-xs">
          Showing {filteredSubmissions.length} unfinished{' '}
          {filteredSubmissions.length > 1 ? 'submissions' : 'submission'}
        </p>
      )}

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

  const [filter, setFilter] = useState<'mine' | 'all'>('mine');
  const [searchQuery, setSearchQuery] = useState<string>('');

  let filteredSubmissions =
    filter === 'mine'
      ? submissions.filter(
          (submission) => submission.createdBy.email === user?.email
        )
      : submissions;

  if (searchQuery) {
    filteredSubmissions = filteredSubmissions.filter((submission) => {
      const haystack = `${submission.residents[0].id} ${submission.residents[0].firstName} ${submission.residents[0].lastName}`;
      if (haystack.toLowerCase().includes(searchQuery.toLowerCase()))
        return submission;
      return;
    });
  }

  return (
    <>
      <fieldset className="govuk-radios govuk-radios--inline lbh-radios">
        <Filter value="mine" filter={filter} setFilter={setFilter}>
          Just mine
        </Filter>
        <Filter value="all" filter={filter} setFilter={setFilter}>
          All
        </Filter>
      </fieldset>

      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Results
        user={user as User}
        filteredSubmissions={filteredSubmissions}
        searchQuery={searchQuery}
      />
    </>
  );
};

export default SubmissionsTable;
