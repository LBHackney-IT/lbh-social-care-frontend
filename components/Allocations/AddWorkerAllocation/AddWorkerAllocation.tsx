import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import {
  useTeamWorkers,
  addWorkerToAllocation,
} from 'utils/api/allocatedWorkers';
import DatePicker from 'components/Form/DatePicker/DatePicker';
import SelectWorker from '../SelectWorker/SelectWorker';
import { format, isAfter, isBefore } from 'date-fns';

interface Props {
  personId: number;
  allocationId: number;
  teamId: number;
  teamAllocationStartDate: Date;
}

const AddAllocation = ({
  personId,
  allocationId,
  teamId,
  teamAllocationStartDate,
}: Props): React.ReactElement => {
  const [postError, setPostError] = useState<boolean | null>();
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [worker, setWorker] = useState<number | null>();
  const [dateValidation, setDateValidation] = useState<boolean>(false);
  const [allocationDate, setAllocationDate] = useState<Date>(
    new Date(Date.now())
  );
  const { query, push } = useRouter();

  const { handleSubmit } = useForm({
    defaultValues: query,
  });

  const { data: workers, error: errorWorkers } = useTeamWorkers(teamId);

  useEffect(() => {
    setDateValidation(false);
    console.log(teamAllocationStartDate);
    if (isAfter(teamAllocationStartDate, allocationDate)) {
      setDateValidation(true);
    }

    if (isBefore(new Date(), allocationDate)) {
      setDateValidation(true);
    }
  }, [allocationDate]);

  const addWorker = useCallback(async () => {
    setPostLoading(true);
    setPostError(null);

    try {
      await addWorkerToAllocation(personId, allocationId, {
        allocatedWorkerId: Number(worker),
        allocationStartDate: format(allocationDate, 'yyyy-MM-dd'),
        team_id: Number(teamId),
      });
      push(`/people/${personId}`);
    } catch (e) {
      setPostError(true);
    }
    setPostLoading(false);
  }, [allocationDate, worker, personId, push]);
  if (errorWorkers || postError) {
    return <ErrorMessage />;
  }
  if (!workers) {
    return <Spinner />;
  }

  if (!teamAllocationStartDate) {
    teamAllocationStartDate = new Date();
  }

  if (!teamId) {
    return <ErrorMessage />;
  }

  return (
    <form role="form" onSubmit={handleSubmit(addWorker)}>
      {workers && (
        <SelectWorker
          records={workers}
          callback={(value: any) => setWorker(value)}
        />
      )}
      <br />

      <DatePicker
        label="Select an allocation date"
        labelSize="s"
        data-testid="allocationStartDate"
        name="allocationStartDate"
        error={
          dateValidation
            ? {
                message: 'Date not valid',
                type: 'string',
              }
            : undefined
        }
        defaultToday
        onChange={(date) => {
          const dateVal = new Date(date.target.value);
          setAllocationDate(dateVal);
        }}
        required
      />
      <Button
        label="Continue"
        type="submit"
        data-testid="submitbutton"
        disabled={!worker && postLoading}
      />

      {!workers && <Spinner />}
    </form>
  );
};

export default AddAllocation;
