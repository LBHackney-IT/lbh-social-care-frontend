import React, { useState, useCallback, useEffect } from 'react';
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
import { format } from 'date-fns';

interface Props {
  personId: number;
  allocationId: number;
}

const AddAllocation = ({
  personId,
  allocationId,
}: Props): React.ReactElement => {
  const [postError, setPostError] = useState<boolean | null>();
  const [postLoading, setPostLoading] = useState<boolean>();
  const [worker, setWorker] = useState<number | null>();
  const [allocationDate, setAllocationDate] = useState<Date>(
    new Date(Date.now())
  );
  const { query, push } = useRouter();
  const { handleSubmit, errors } = useForm({
    defaultValues: query,
  });
  const { data: workers, error: errorWorkers } = useTeamWorkers(87);

  const addWorker = useCallback(async () => {
    setPostLoading(true);
    setPostError(null);
    try {
      await addWorkerToAllocation(personId, allocationId, {
        allocatedWorkerId: Number(worker),
        allocationStartDate: format(allocationDate, 'yyyy-MM-dd'),
      });

      push(`/people/${personId}`);
    } catch (e) {
      setPostError(true);
    }
    setPostLoading(false);
  }, [allocationDate, worker, personId, push]);
  useEffect(() => {
    setPostError(null);
  }, [query]);
  if (errorWorkers || postError) {
    return <ErrorMessage />;
  }
  if (!workers) {
    return <Spinner />;
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
        name="allocationStartDate"
        error={errors.allocationStartDate}
        defaultToday
        onChange={(date) => {
          setAllocationDate(new Date(date.target.value));
        }}
        required
      />
      <Button label="Continue" type="submit" disabled={postLoading} />

      {!workers && <Spinner />}
    </form>
  );
};

export default AddAllocation;
