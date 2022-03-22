import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import TextArea from 'components/Form/TextArea/TextArea';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useTeamWorkers } from 'utils/api/allocatedWorkers';
import DatePicker from 'components/Form/DatePicker/DatePicker';

interface Props {
  type: string;
  personId: number;
  allocationId: number;
}

const AddAllocation = ({
  type,
  personId,
  allocationId,
}: Props): React.ReactElement => {
  const [postError, setPostError] = useState<boolean | null>();
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [deallocationReason, setDeallocationReason] = useState<string>('');
  const [deallocationDate, setDeallocationDate] = useState<Date>(
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
      console.log(deallocationReason);
      console.log(deallocationDate);

      push(`/people/${personId}`);
    } catch (e) {
      setPostError(true);
    }
    setPostLoading(false);
  }, [personId, push]);
  if (errorWorkers || postError) {
    return <ErrorMessage />;
  }
  if (!workers) {
    return <Spinner />;
  }
  return (
    <form role="form" onSubmit={handleSubmit(addWorker)}>
      <TextArea
        name="deallocationReason"
        label={'Reason for deallocation'}
        onChange={(text) => {
          setDeallocationReason(text.target.value);
        }}
      />

      <DatePicker
        label="Select an allocation date"
        labelSize="s"
        data-testid="allocationStartDate"
        name="deallocationDate"
        error={errors.deallocationDate}
        defaultToday
        onChange={(date) => {
          setDeallocationDate(new Date(date.target.value));
        }}
        required
      />

      <Button
        label="Continue"
        type="submit"
        data-testid="submitbutton"
        disabled={!deallocationReason}
      />

      {!workers && <Spinner />}
    </form>
  );
};

export default AddAllocation;
