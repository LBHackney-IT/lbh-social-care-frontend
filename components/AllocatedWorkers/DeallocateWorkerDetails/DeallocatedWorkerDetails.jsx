import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { Button, TextArea } from 'components/Form';
import Spinner from 'components/Spinner/Spinner';
import { deleteAllocatedWorkers } from 'utils/api/allocatedWorkers';

const DeallocatedWorkersDetails = ({
  personId,
  allocatedWorker,
  firstName,
  lastName,
  workerType,
  allocatedWorkerTeam,
  isLastWorker,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  const patchData = {
    worker: allocatedWorker,
  };
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const test = Object.assign(patchData, data);
      await deleteAllocatedWorkers(personId, test);
      setComplete(true);
    } catch {
      setError(true);
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="govuk-heading-l">Reason for worker deallocation</h2>
      <p className="govuk-body govuk-!-font-weight-bold" ref={register}>
        Person:{firstName} {lastName}
      </p>
      <h2>Deallocation details</h2>
      <ul className="govuk-list">
        <li>
          <span className="govuk-!-font-weight-bold">
            {' '}
            Worker to be deallocated:
          </span>{' '}
          {allocatedWorker}, {workerType}, {allocatedWorkerTeam}
        </li>
      </ul>
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
  personId: PropTypes.string,
  allocatedWorker: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  workerType: PropTypes.string,
  allocatedWorkerTeam: PropTypes.string,
  isLastWorker: PropTypes.bool,
};

export default DeallocatedWorkersDetails;
