import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import TextArea from 'components/Form/TextArea/TextArea';
import { Resident } from 'types';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import DatePicker from 'components/Form/DatePicker/DatePicker';
import { format, isAfter, isBefore } from 'date-fns';
import { deallocateTeamWorker } from 'utils/api/allocatedWorkers';

interface Props {
  type: string;
  resident: Resident;
  allocationId: number;
  allocationStartDate: Date;
  allocatedWorkerTeam?: string;
  allocatedWorker?: string;
}

const DeallocateTeamWorker = ({
  type,
  resident,
  allocationId,
  allocationStartDate,
  allocatedWorkerTeam,
  allocatedWorker,
}: Props): React.ReactElement => {
  const [postError, setPostError] = useState<boolean | null>();
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [deallocationReason, setDeallocationReason] = useState<string>('');
  const [deallocationDate, setDeallocationDate] = useState<Date>(
    new Date(Date.now())
  );
  const [dateValidation, setDateValidation] = useState<boolean>(false);

  const { query, push } = useRouter();
  const { handleSubmit } = useForm({
    defaultValues: query,
  });

  useEffect(() => {
    setDateValidation(false);
    if (isAfter(allocationStartDate, deallocationDate)) {
      setDateValidation(true);
    }

    if (isBefore(new Date(), deallocationDate)) {
      setDateValidation(true);
    }
  }, [deallocationDate]);

  const addWorker = useCallback(async () => {
    setPostLoading(true);
    setPostError(null);

    try {
      await deallocateTeamWorker(resident.id, {
        id: Number(allocationId),
        deallocationReason: deallocationReason,
        deallocationDate: format(deallocationDate, 'yyyy-MM-dd'),
        deallocationScope: type,
      });

      push(`/residents/${resident.id}/allocations`);
    } catch (e) {
      setPostError(true);
    }
    setPostLoading(false);
  }, [deallocationReason, deallocationDate, resident.id, push]);

  if (postError) {
    return <ErrorMessage label="Error during POST operation" />;
  }

  return (
    <>
      <h4>Deallocation details</h4>

      <br />
      {type == 'team'
        ? `${allocatedWorkerTeam} Team, allocated ${allocationStartDate.toLocaleDateString()}`
        : `${allocatedWorker}, social worker${
            allocatedWorkerTeam ? ` (${allocatedWorkerTeam} Team)` : ''
          }, allocated ${allocationStartDate.toLocaleDateString()}`}

      <form role="form" onSubmit={handleSubmit(addWorker)}>
        <TextArea
          name="deallocationReason"
          label={'Reason for deallocation'}
          data-testid="deallocationReason"
          onChange={(text) => {
            setDeallocationReason(text.target.value);
          }}
        />

        <DatePicker
          label="Select a deallocation date"
          labelSize="s"
          data-testid="deallocationDate"
          name="deallocationDate"
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
            setDeallocationDate(new Date(date.target.value));
          }}
          required
        />

        <Button
          label="Continue"
          type="submit"
          data-testid="submitbutton"
          disabled={!deallocationReason || postLoading || dateValidation}
        />
      </form>
    </>
  );
};

export default DeallocateTeamWorker;
