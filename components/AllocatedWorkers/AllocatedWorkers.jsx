import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import AllocatedWorkersTable from 'components/AllocatedWorkers/AllocatedWorkersTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { getAllocatedWorkers } from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';
import Button from 'components/Button/Button';
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
  const { asPath } = useRouter();
  const { user } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="govuk-!-margin-top-8 govuk-!-margin-bottom-8">
      {allocWorkers && (
        <AllocatedWorkersTable
          records={allocWorkers}
          updateWorkers={getWorkers}
        />
      )}
      {user.hasAllocationsPermissions && (
        <div>
          <div className="lbh-table-header">
            <h3 className="govuk-fieldset__legend--m govuk-custom-text-color govuk-!-margin-top-0">
              ALLOCATED WORKER {allocWorkers.length + 1}
            </h3>
            <Button
              label="Allocate worker"
              isSecondary
              route={`${asPath}/allocations/add`}
            />
          </div>
          <hr className="govuk-divider" />
          <p>
            <i>
              {allocWorkers.length === 0 ? 'Currently unallocated' : 'Optional'}
            </i>
          </p>
        </div>
      )}
      {error && <ErrorMessage />}
    </div>
  );
};

AllocatedWorkers.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AllocatedWorkers;
