import { useState, useCallback } from 'react';

import SearchByMosaicId from './SearchByMosaicId';
import SearchByDetails from './SearchByDetails';
import ResultTable from './ResultTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const Search = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();
  const onResult = useCallback(async (results) => {
    try {
      const data = await results;
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
      <SearchByMosaicId onResult={onResult} setLoading={setLoading} />
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
      <SearchByDetails onResult={onResult} setLoading={setLoading} />
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
