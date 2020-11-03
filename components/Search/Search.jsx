import { useState, useContext, useMemo, useCallback } from 'react';

import SearchForm from './SearchForm';
import ResultTable from './ResultTable';
import { Button } from 'components/Form';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import UserContext from 'components/UserContext/UserContext';
import { getResident, getResidents } from 'utils/api/residents';
import { getPermissionFilter } from 'utils/user';

const Search = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();
  const [formData, setFormData] = useState();
  const { user } = useContext(UserContext);
  const permission = useMemo(() => getPermissionFilter(user), []);
  const onFormSubmit = useCallback(async (formData, residents = []) => {
    setLoading(true);
    try {
      setFormData(formData);
      const { mosaicId, ...personDetails } = formData;
      const data = mosaicId
        ? await getResident(mosaicId, { context_flag: permission })
        : await getResidents({ ...personDetails, context_flag: permission });
      setLoading(false);
      setError(null);
      setResults(
        mosaicId
          ? { residents: [...residents, data] }
          : { ...data, residents: [...residents, ...data.residents] }
      );
    } catch (e) {
      setLoading(false);
      setError(e.response?.data || 'Oops an error occurred');
      setResults(null);
    }
  });
  return (
    <>
      <SearchForm onFormSubmit={onFormSubmit} />
      {results && <ResultTable results={results.residents} />}
      <div style={{ height: '50px', textAlign: 'center' }}>
        {loading ? (
          <div>Searching...</div>
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
