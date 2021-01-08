import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { Button, TextArea } from 'components/Form';
import Spinner from 'components/Spinner/Spinner';
import UserContext from 'components/UserContext/UserContext';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

const DeallocatedWorkersDetails = ({
  allocatedWorker,
  firstName,
  lastName,
  workerType,
  allocatedWorkerTeam,
  isLastWorker,
}) => {
  const { user } = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const patchData = {
    worker: allocatedWorker,
  };
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const test = Object.assign(patchData, data);
      console.log('loading: ' + loading);
      await new Promise((resolve) =>
        setTimeout(
          () => resolve(console.log('data is' + JSON.stringify(test))),
          3000
        )
      );
    } catch {
      <ErrorMessage label="Something went wrong, please retry"></ErrorMessage>;
      console.log('Something went wrong');
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="govuk-heading-l">Reason for worker deallocation</h1>
      <p className="govuk-body govuk-!-font-weight-bold" ref={register}>
        Case:{firstName} {lastName}
      </p>
      <h2>Deallocation details</h2>
      <ul className="govuk-list">
        <li className="govuk-!-font-weight-bold">
          Worker to be deallocated: {allocatedWorker}, {workerType},{' '}
          {allocatedWorkerTeam}
        </li>
        <li className="govuk-!-font-weight-bold" ref={register}>
          Deallocated by: {user.name}
        </li>
        <li className="govuk-!-font-weight-bold" ref={register}>
          Deallocation date:{' '}
          {new Date(Date.now()).toLocaleString().split(',')[0]}
        </li>
      </ul>
      {isLastWorker && (
        <p className="govuk-body govuk-!-font-weight-bold">
          Allocated Status: This case will become unallocated when this worker
          is deallocated
        </p>
      )}
      <h2>What is the reason for this worker to be deallocated?</h2>
      <TextArea name="DeallocationReason" register={register} />
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <Button label="Save deallocation" type="submit" />
      )}
    </form>
  );
};

export default DeallocatedWorkersDetails;
