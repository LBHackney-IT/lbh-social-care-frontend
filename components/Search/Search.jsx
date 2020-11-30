import { useState, useContext, useMemo, useCallback } from 'react';

import SearchResidentsForm from './forms/SearchResidentsForm';
import SearchCasesForm from './forms/SearchCasesForm';
import ResidentsTable from './results/ResidentsTable';
import CasesTable from './results/CasesTable';

import { Button } from 'components/Form';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import UserContext from 'components/UserContext/UserContext';

import { getResidents } from 'utils/api/residents';
import { getCases } from 'utils/api/cases';
import { getPermissionFilter } from 'utils/user';

const getRecords = (data) => [
  ...(data.residents || []),
  ...(data?.cases || []),
];

const Search = ({ query, type }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();
  const [formData, setFormData] = useState();
  const { user } = useContext(UserContext);
  const permission = useMemo(() => getPermissionFilter(user), []);
  const { SearchForm, SearchResults, searchFunction } = useMemo(
    () =>
      type === 'residents'
        ? {
            SearchForm: SearchResidentsForm,
            SearchResults: ResidentsTable,
            searchFunction: getResidents,
          }
        : {
            SearchForm: SearchCasesForm,
            SearchResults: CasesTable,
            searchFunction: getCases,
          },
    []
  );
  const onFormSubmit = useCallback(async (formData, records = []) => {
    setLoading(true);
    !formData.cursor && setResults(null);
    setError(null);
    try {
      setFormData(formData);
      const data = await searchFunction({
        ...formData,
        context_flag: permission,
      });
      setLoading(false);
      setResults({
        ...data,
        records: [...records, ...getRecords(data)],
      });
    } catch (e) {
      setLoading(false);
      setError(e.response?.data || 'Oops an error occurred');
    }
  });
  return (
    <>
      <SearchForm onFormSubmit={onFormSubmit} query={query} user={user} />
      {results && <SearchResults results={results.records} />}
      <div style={{ height: '50px', textAlign: 'center' }}>
        {loading ? (
          <Spinner />
        ) : (
          results?.nextCursor && (
            <Button
              label="load more"
              onClick={() =>
                onFormSubmit(
                  { ...formData, cursor: results.nextCursor },
                  results.records
                )
              }
            />
          )
        )}
      </div>
      {error && <ErrorMessage label={error} />}
    </>
  );
};

export default Search;
