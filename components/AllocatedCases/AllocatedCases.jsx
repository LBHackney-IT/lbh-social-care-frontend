import PropTypes from 'prop-types';

import AllocatedCasesTable from 'components/AllocatedCases/AllocatedCasesTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAllocationsByWorker } from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';

const AllocatedCases = ({ id }) => {
  const { data: allocations, error } = useAllocationsByWorker(id);
  if (error) {
    return <ErrorMessage />;
  }
  if (!allocations) {
    return <Spinner />;
  }
  return (
    <>
      {allocations.workers.length === 0 ? (
        <p className="govuk-body govuk-!-margin-top-5">Worker not found</p>
      ) : (
        <>
          {allocations.workers && (
            <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
              {`Allocations: ${allocations.workers[0].firstName} ${allocations.workers[0].lastName}, ${allocations.workers[0].role}`}
            </h1>
          )}
          {allocations.allocations && (
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
