import { useState, useMemo } from 'react';
import { InProgressSubmission } from 'data/flexibleForms/forms.types';
import SubmissionRow from './SubmissionPanel';
import { useAuth } from 'components/UserContext/UserContext';
import s from './index.module.scss';
import st from 'components/Tabs/Tabs.module.scss';
import Tab from './Tab';
import SearchBox from './SearchBox';
import useSearch from 'hooks/useSearch';
import { mapFormIdToFormDefinition } from 'data/flexibleForms/mapFormIdsToFormDefinition';

interface Props {
  submissions: InProgressSubmission[];
  everyoneCount: number;
}

export const SubmissionsTable = ({
  submissions,
  everyoneCount,
}: Props): React.ReactElement => {
  const { user } = useAuth();

  const [filter, setFilter] = useState<'mine' | 'all'>('mine');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchableSubmissions = useMemo(
    () =>
      submissions
        // augment each one with its form
        .map((submission) => ({
          ...submission,
          form: mapFormIdToFormDefinition[submission.formId]?.form,
        }))
        .filter((submission) => {
          // hide any restricted records unless the user has permission to see them
          if (
            !user?.hasUnrestrictedPermissions &&
            submission.residents.every(
              (resident) => resident.restricted === 'Y'
            )
          )
            return false;

          // Otherwise, this record is good to show
          return true;
        }),
    [submissions, user?.hasUnrestrictedPermissions]
  );

  const searchResults = useSearch(
    searchQuery,
    searchableSubmissions,
    [
      'createdBy.email',
      'createdBy.firstName',
      'createdBy.lastName',
      'residents.fullName',
      'residents.id',
      'form.name',
    ],
    1
  );

  const justMyResults = useMemo(
    () =>
      searchResults.filter(
        (submission) => submission.createdBy.email === user?.email
      ),
    [searchResults, user?.email]
  );

  const results = filter === 'mine' ? justMyResults : searchResults;

  return (
    <>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <fieldset className="govuk-tabs lbh-tabs govuk-!-margin-top-8">
        <ul className={st.tabList}>
          <Tab filter={filter} setFilter={setFilter} value="mine">
            <>Just mine ({justMyResults.length})</>
          </Tab>
          <Tab filter={filter} setFilter={setFilter} value="all">
            <>Everyone ({everyoneCount})</>
          </Tab>
        </ul>
      </fieldset>

      <ul className={`lbh-list ${s.list}`}>
        {results?.length > 0 ? (
          results.map((submission) => (
            <SubmissionRow
              submission={submission}
              key={submission.submissionId}
            />
          ))
        ) : (
          <p>No results to show.</p>
        )}
      </ul>
    </>
  );
};

export default SubmissionsTable;
