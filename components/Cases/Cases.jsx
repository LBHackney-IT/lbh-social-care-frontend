import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import CasesTable from './CasesTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { getResidentCases } from 'utils/api/residents';

const Cases = ({ id }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [cases, setCases] = useState();
  const getPersonCases = useCallback(async (id) => {
    try {
      const data = await getResidentCases(id);
      setLoading(false);
      setError(null);
      setCases(Array.isArray(data) ? data : [data]);
    } catch (e) {
      setLoading(false);
      setError(e.response.data);
      setCases(null);
    }
  });
  useEffect(() => {
    setLoading(true);
    getPersonCases(id);
  }, [id]);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {cases && <CasesTable cases={cases} />}
          {error && <ErrorMessage label={error} />}
        </>
      )}
    </>
  );
};

Cases.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Cases;
