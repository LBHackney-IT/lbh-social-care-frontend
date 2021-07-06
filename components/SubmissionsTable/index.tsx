import { useState } from 'react';
import { Submission } from 'data/flexibleForms/forms.types';
import SubmissionRow from './SubmissionRow';
import { useAuth } from 'components/UserContext/UserContext';
import { User } from 'types';
import s from './index.module.scss';
import Filter from './Filter';
import SearchBox from './SearchBox';
import useSearch from 'hooks/useSearch';

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

  const filteredSubmissions = submissions.filter((submission) => {
    // hide any restricted records unless the user has permission to see them
    if (
      !user?.hasUnrestrictedPermissions &&
      submission.residents.every((resident) => resident.restricted === 'Y')
    )
      return false;

    // If showing only the current user's submissions, then filter out if the emails don't match
    if (filter === 'mine' && submission.createdBy.email !== user?.email) {
      return false;
    }

    // hide discarded submissions
    if (submission.submissionState === 'Discarded') return false;

    // Otherwise, this record is good to show
    return true;
  });

  const results = useSearch(
    searchQuery,
    filteredSubmissions,
    [
      'createdBy.email',
      'createdBy.firstName',
      'createdBy.lastName',
      'residents.fullName',
      'residents.id',
      'formName',
    ],
    1
  );

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
        filteredSubmissions={results}
        searchQuery={searchQuery}
      />
    </>
  );
};

export default SubmissionsTable;
