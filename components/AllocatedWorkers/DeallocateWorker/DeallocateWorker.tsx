import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import isPast from 'date-fns/isPast';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { DateInput, TextArea } from 'components/Form';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import {
  useAllocatedWorkers,
  deleteAllocation,
} from 'utils/api/allocatedWorkers';

interface Props {
  personId: number;
  allocationId: number;
}

const DeallocatedWorkers = ({
  personId,
  allocationId,
}: Props): React.ReactElement => {
  const { register, handleSubmit, errors, control } = useForm();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [postError, setPostError] = useState(false);
  const [deallocationReason, setDeallocationReason] = useState('');
  const { data: { allocations } = {}, error } = useAllocatedWorkers(personId);
  const onSubmit = async ({
    deallocationReason,
    deallocationDate,
  }: {
    deallocationReason: string;
    deallocationDate: string;
  }) => {
    setLoading(true);
    try {
      await deleteAllocation(personId, {
        id: allocationId,
        deallocationScope: 'team',
        deallocationReason,
        deallocationDate,
      });
      setDeallocationReason(deallocationReason);
      setComplete(true);
    } catch {
      setPostError(true);
    }
    setLoading(false);
  };
  if (error) {
    return <ErrorMessage label={error.message} />;
  }
  if (!allocations) {
    return <Spinner />;
  }
  const currentAllocation = allocations.find(({ id }) => id === allocationId);
  if (!currentAllocation) {
    return <ErrorMessage label="Allocated worked not found." />;
  }
  console.log(errors);
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
          <TextArea
            name="deallocationReason"
            label="What is the reason for this worker to be deallocated?"
            // @ts-ignore
            register={register({
              required:
                'Please add a reason for this worker to be deallocated.',
            })}
            error={errors.deallocationReason}
          />
          <DateInput
            hint="Date cannot be set in the future"
            label="Deallocation Date:"
            name="deallocationDate"
            error={errors.deallocationDate}
            control={control}
            rules={{
              required: 'Please select the deallocation start date.',
              validate: {
                past: (value) =>
                  value && (isPast(new Date(value)) || 'Must be a past Date'),
              },
            }}
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

export default DeallocatedWorkers;
