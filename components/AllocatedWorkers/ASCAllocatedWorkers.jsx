import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import AllocatedWorkersTable from 'components/AllocatedWorkers/AllocatedWorkersTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { getResidentCases } from 'utils/api/residents';
import Spinner from 'components/Spinner/Spinner';

const ASCAllocatedWorkers = ({ id }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [ascAllocWorkers, setAscAllocWorkers] = useState();
  const getASCAllocatedWorkers = useCallback(async (id) => {
    try {
      const data = await getResidentCases(id);
      setLoading(false);
      setError(null);
      setAscAllocWorkers(Array.isArray(data) ? data : [data]);
    } catch (e) {
      setLoading(false);
      setError(e.response.data);
      setAscAllocWorkers(null);
    }
  });
  useEffect(() => {
    setLoading(true);
    getASCAllocatedWorkers(id);
  }, [id]);
  return (
    <>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          {ascAllocWorkers && (
            <AllocatedWorkersTable records={ascAllocWorkers} />
          )}
          {error && <ErrorMessage label={error} />}
        </>
      )}
    </>
  );
};

ASCAllocatedWorkers.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ASCAllocatedWorkers;
