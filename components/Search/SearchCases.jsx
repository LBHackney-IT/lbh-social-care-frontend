import { useState, useContext, useMemo, useCallback } from 'react';

import SearchCasesForm from './SearchCasesForm';
import CasesTable from 'components/Cases/CasesTable';
import { Button } from 'components/Form';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import UserContext from 'components/UserContext/UserContext';
import { getCases } from 'utils/api/cases';
import { getPermissionFilter } from 'utils/user';

const SearchCases = ({ query }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();
  const [formData, setFormData] = useState();
  const { user } = useContext(UserContext);
  const permission = useMemo(() => getPermissionFilter(user), []);

  const onFormSubmit = useCallback(async (formData, cases = []) => {
    setLoading(true);
    !formData.cursor && setResults(null);
    setError(null);
    try {
      setFormData(formData);
      const { ...caseDetails } = formData;
      const data = await getCases({
        ...caseDetails,
        context_flag: permission,
      });
      setLoading(false);
      setError(null);
      setResults({ cases: [...cases, ...data.cases] });
    } catch (e) {
      setLoading(false);
      setError(e.response?.data || 'Oops an error occurred');
    }
  });
  return (
    <>
      <SearchCasesForm onFormSubmit={onFormSubmit} query={query} />
      {results && <CasesTable cases={results.cases} />}
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
                  results.cases
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

export default SearchCases;
