import { useState, useCallback } from 'react';
import SearchForm from './SearchForm';
import ResultTable from './ResultTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { getResident, getResidents } from 'utils/api/residents';

const Search = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();
  const onFormSubmit = useCallback(async (formData) => {
    setLoading(true);
    try {
      const { mosaicId, ...personDetails } = formData;
      const data = mosaicId
        ? await getResident(mosaicId)
        : await getResidents(personDetails);
      setLoading(false);
      setError(null);
      setResults(Array.isArray(data) ? data : [data]);
    } catch (e) {
      setLoading(false);
      setError(e.response.data);
      setResults(null);
    }
  });
  return (
    <>
      <SearchForm onFormSubmit={onFormSubmit} />
      {loading ? (
        <div>Searching...</div>
      ) : (
        <>
          {results && <ResultTable results={results} />}
          {error && <ErrorMessage label={error} />}
        </>
      )}
    </>
  );
};

export default Search;
