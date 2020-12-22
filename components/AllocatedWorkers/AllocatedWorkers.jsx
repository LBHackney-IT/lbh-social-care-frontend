import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import AllocatedWorkersTable from 'components/AllocatedWorkers/AllocatedWorkersTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { getAllocatedWorkers } from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';

const AllocatedWorkers = ({ id }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [allocWorkers, setAllocWorkers] = useState();
  const getWorkers = useCallback(async () => {
    try {
      const data = await getAllocatedWorkers(id);
      setAllocWorkers(data.allocations);
    } catch (e) {
      setError(e.response.data);
    }
    setLoading(false);
  });
  useEffect(() => {
    getWorkers();
  }, []);
  return (
    <>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          {allocWorkers && <AllocatedWorkersTable records={allocWorkers} />}
          {error && <ErrorMessage label={error} />}
        </>
      )}
    </>
  );
};

AllocatedWorkers.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AllocatedWorkers;
