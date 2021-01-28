import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import AllocatedCasesTable from 'components/AllocatedCases/AllocatedCasesTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { getAllocationsByWorker } from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';

const AllocatedCases = ({ id }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [allocations, setAllocations] = useState();

  const getAllocation = useCallback(async () => {
    try {
      const allocationsData = await getAllocationsByWorker(id);
      setAllocations(allocationsData);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  });
  useEffect(() => {
    getAllocation();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      {allocations && allocations.workers.length === 0 ? (
        <p className="govuk-body govuk-!-margin-top-5">Worker not found</p>
      ) : (
        <>
          {error && <ErrorMessage />}
          {allocations && allocations.workers && (
            <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
              {`Allocations: ${allocations.workers[0].firstName} ${allocations.workers[0].lastName}, ${allocations.workers[0].role}`}
            </h1>
          )}
          {allocations && allocations.allocations && (
            <>
              {allocations.allocations?.length > 0 ? (
                <AllocatedCasesTable cases={allocations.allocations} />
              ) : (
                <p className="govuk-body govuk-!-margin-top-5">
                  No people are assigned to this worker
                </p>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

AllocatedCases.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AllocatedCases;
