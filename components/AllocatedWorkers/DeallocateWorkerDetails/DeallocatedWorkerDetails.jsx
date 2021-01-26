import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { TextArea } from 'components/Form';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import { deleteAllocatedWorker } from 'utils/api/allocatedWorkers';

const DeallocatedWorkersDetails = ({
  personId,
  id,
  allocatedWorker,
  workerType,
  allocatedWorkerTeam,
  isLastWorker,
  onDeallocation,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  const [deallocationReason, setDeallocationReason] = useState('');
  const onSubmit = async (reason) => {
    setLoading(true);
    try {
      await deleteAllocatedWorker(personId, {
        id: id,
        deallocationReason: reason.deallocation_reason,
      });
      setDeallocationReason(reason.deallocation_reason);
      onDeallocation();
      setComplete(true);
    } catch {
      setError(true);
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Reason for worker deallocation</h1>
      <h2>Deallocation details</h2>
      <p className="govuk-body">
        <span className="govuk-!-font-weight-bold">
          {' '}
          {complete ? 'Worker Deallocated' : 'Worker to be deallocated:'}
        </span>{' '}
        {allocatedWorker}
        {workerType && `, ${workerType}`}
        {allocatedWorkerTeam && `, ${allocatedWorkerTeam}`}
      </p>
      {isLastWorker && (
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
            <Link href="#">
              <a>Allocate another worker to this person</a>
            </Link>
          </p>
          <p>
            <Link href="#">
              <a>Transfer person to another team</a>
            </Link>
          </p>
        </>
      )}

      {error && <ErrorMessage />}
    </form>
  );
};

DeallocatedWorkersDetails.propTypes = {
  personId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  allocatedWorker: PropTypes.string.isRequired,
  workerType: PropTypes.string,
  allocatedWorkerTeam: PropTypes.string.isRequired,
  isLastWorker: PropTypes.bool.isRequired,
  onDeallocation: PropTypes.func.isRequired,
};

export default DeallocatedWorkersDetails;
