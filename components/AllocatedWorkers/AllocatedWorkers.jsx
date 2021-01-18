import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import AllocatedWorkersTable from 'components/AllocatedWorkers/AllocatedWorkersTable';
import AddAllocatedWorker from 'components/AllocatedWorkers/AddAllocatedWorker/AddAllocatedWorker';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { getAllocatedWorkers } from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';
import { useAuth } from 'components/UserContext/UserContext';

const AllocatedWorkers = ({ id }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
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
  const { user } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="govuk-!-margin-top-8 govuk-!-margin-bottom-8">
      {allocWorkers && <AllocatedWorkersTable records={allocWorkers} />}
      {user.hasAdminPermissions && (
        <AddAllocatedWorker
          personId={id}
          currentlyAllocated={allocWorkers.length}
          onAddNewAllocation={getWorkers}
        />
      )}
      {error && <ErrorMessage />}
    </div>
  );
};

AllocatedWorkers.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AllocatedWorkers;
