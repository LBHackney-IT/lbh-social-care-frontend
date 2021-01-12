import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { Button, TextArea } from 'components/Form';
import Spinner from 'components/Spinner/Spinner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
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
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const patchData = {
    worker: allocatedWorker,
  };
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const test = JSON.stringify(Object.assign(patchData, data));
      await deleteAllocatedWorkers(personId, test);
    } catch {
      <ErrorMessage label="Something went wrong, please retry"></ErrorMessage>;
      console.log('Something went wrong');
    }
    setLoading(false);
    setComplete(true);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="govuk-heading-l">Reason for worker deallocation</h1>
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
          <TextArea name="DeallocationReason" register={register} />
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
    </form>
  );
};

export default DeallocatedWorkersDetails;
