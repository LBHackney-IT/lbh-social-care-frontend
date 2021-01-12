import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import AllocatedWorkersTable from 'components/AllocatedWorkers/AllocatedWorkersTable';
import AddAllocatedWorker from 'components/AllocatedWorkers/AddAllocatedWorker/AddAllocatedWorker';
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
      setError(true);
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
          {allocWorkers && (
            <div className="govuk-!-margin-top-8 govuk-!-margin-bottom-8">
              <AllocatedWorkersTable records={allocWorkers} />
              <AddAllocatedWorker
                personId={id}
                currentlyAllocated={allocWorkers.length}
              />
            </div>
          )}
          {error && <ErrorMessage />}
        </>
      )}
    </>
  );
};

AllocatedWorkers.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AllocatedWorkers;
