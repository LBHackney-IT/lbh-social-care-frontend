import { useState, useContext, useMemo, useCallback } from 'react';

import SearchForm from './SearchForm';
import ResultTable from './ResultTable';
import { Button } from 'components/Form';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import UserContext from 'components/UserContext/UserContext';
import { getResidents } from 'utils/api/residents';
import { getPermissionFilter } from 'utils/user';

const Search = ({ query }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();
  const [formData, setFormData] = useState();
  const { user } = useContext(UserContext);
  const permission = useMemo(() => getPermissionFilter(user), []);
  const onFormSubmit = useCallback(async (formData, residents = []) => {
    setLoading(true);
    !formData.cursor && setResults(null);
    setError(null);
    try {
      setFormData(formData);
      const data = await getResidents({
        ...formData,
        context_flag: permission,
      });
      setLoading(false);
      setResults({ ...data, residents: [...residents, ...data.residents] });
    } catch (e) {
      setLoading(false);
      setError(e.response?.data || 'Oops an error occurred');
    }
  });
  return (
    <>
      <SearchForm onFormSubmit={onFormSubmit} query={query} />
      {results && <ResultTable results={results.residents} />}
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
                  results.residents
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
