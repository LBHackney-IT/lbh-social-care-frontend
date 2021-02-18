import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import PropTypes from 'prop-types';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { TextArea } from 'components/Form';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import {
  useAllocatedWorkers,
  deleteAllocatedWorker,
} from 'utils/api/allocatedWorkers';

const DeallocatedWorkers = ({ personId, allocationId }) => {
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [postError, setPostError] = useState(false);
  const [deallocationReason, setDeallocationReason] = useState('');
  const { data: { allocations } = {}, error } = useAllocatedWorkers(personId);
  const onSubmit = async (reason) => {
    setLoading(true);
    try {
      await deleteAllocatedWorker(personId, {
        id: allocationId,
        deallocationReason: reason.deallocation_reason,
      });
      setDeallocationReason(reason.deallocation_reason);
      setComplete(true);
    } catch {
      setPostError(true);
    }
    setLoading(false);
  };
  if (error) {
    return <ErrorMessage />;
  }
  if (!allocations) {
    return <Spinner />;
  }
  const currentAllocation = allocations?.find(
    ({ id }) => id === parseInt(allocationId, 10)
  );
  if (allocations.length > 0 && !currentAllocation) {
    return <ErrorMessage label="Allocated worked not found." />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Reason for worker deallocation</h1>
      <h2>Deallocation details</h2>
      <p className="govuk-body">
        <span className="govuk-!-font-weight-bold">
          {' '}
          {complete ? 'Worker Deallocated' : 'Worker to be deallocated:'}
        </span>{' '}
        {currentAllocation.allocatedWorker}
        {currentAllocation.workerType && `, ${currentAllocation.workerType}`}
        {currentAllocation.allocatedWorkerTeam &&
          `, ${currentAllocation.allocatedWorkerTeam}`}
      </p>
      {allocations.length === 1 && (
        <div className="govuk-warning-text">
          <span className="govuk-warning-text__icon" aria-hidden="true">
            !
          </span>
          <strong className="govuk-warning-text__text">
            <span className="govuk-warning-text__assistive">Warning</span>
            This person will be unallocated when this worker is deallocated
          </strong>
        </div>
      )}
      {!complete && (
        <>
          <h2>What is the reason for this worker to be deallocated?</h2>
          <TextArea
            name="deallocation_reason"
            register={register({
              required: 'Please add a reason for this worker to be deallocated',
            })}
            error={errors.deallocation_reason}
          />
        </>
      )}
      {loading && (
        <div>
          <Spinner />
        </div>
      )}
      {!loading && !complete && (
        <Button id="but1" label="Save deallocation" type="submit" />
      )}
      {complete && (
        <>
          <h2>Reason for worker deallocation</h2>
          <p>{deallocationReason}</p>
          <h2>What do you want to do next?</h2>
          <p>
            <Link
              href={`/people/${personId}/allocations/add`}
              replace={true}
              shallow={true}
            >
              <a>Allocate another worker to this person</a>
            </Link>
          </p>
        </>
      )}
      {postError && <ErrorMessage />}
    </form>
  );
};

DeallocatedWorkers.propTypes = {
  personId: PropTypes.string,
  allocationId: PropTypes.string,
};

export default DeallocatedWorkers;
