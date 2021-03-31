import AllocatedCasesTable from 'components/AllocatedCases/AllocatedCasesTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAllocationsByWorker } from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';

interface Props {
  id: number;
}

const AllocatedCases = ({ id }: Props): React.ReactElement => {
  const { data: allocations, error } = useAllocationsByWorker(id);
  if (error) {
    return <ErrorMessage />;
  }
  if (!allocations) {
    return <Spinner />;
  }
  return (
    <main className="lbh-main-wrapper" id="main-content" role="main">
      {allocations.workers.length === 0 ? (
        <p className="lbh-body govuk-!-margin-top-5">Worker not found</p>
      ) : (
        <>
          {allocations.workers && (
            <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
              {`Allocated to ${allocations.workers[0].firstName} ${allocations.workers[0].lastName}, ${allocations.workers[0].role}`}
            </h1>
          )}
          {allocations.allocations && (
            <>
              {allocations.allocations?.length > 0 ? (
                <AllocatedCasesTable cases={allocations.allocations} />
              ) : (
                <p className="lbh-body">
                  No people are allocated to this worker
                </p>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};

export default AllocatedCases;
