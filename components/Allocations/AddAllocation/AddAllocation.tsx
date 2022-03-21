import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Autocomplete } from 'components/Form';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import {
  useTeams,
  useTeamWorkers,
  addAllocatedWorker,
} from 'utils/api/allocatedWorkers';
import { AgeContext } from 'types';
import DatePicker from 'components/Form/DatePicker/DatePicker';
import Radios from 'components/Form/Radios/Radios';
import SelectWorker from '../SelectWorker/SelectWorker';
import s from './AddAllocation.module.scss';
import { format } from 'date-fns';

interface Props {
  personId: number;
  ageContext: AgeContext;
}

const AddAllocation = ({ personId, ageContext }: Props): React.ReactElement => {
  const [postError, setPostError] = useState<boolean | null>();
  const [postLoading, setPostLoading] = useState<boolean>();
  const [workerAllocation, setWorkerAllocation] = useState<boolean>(false);
  const [priority, setPriority] = useState<string>();
  const [worker, setWorker] = useState<number | null>();
  const [allocationDate, setAllocationDate] = useState<Date>(
    new Date(Date.now())
  );
  const { query, push, replace, pathname } = useRouter();
  const { handleSubmit, control, errors } = useForm({
    defaultValues: query,
  });
  const { teamId } = query as { teamId?: number };
  const { data: { teams } = {}, error: errorTeams } = useTeams({ ageContext });
  const { data: workers, error: errorWorkers } = useTeamWorkers(teamId);

  const addWorker = useCallback(async () => {
    setPostLoading(true);
    setPostError(null);
    try {
      await addAllocatedWorker(personId, {
        allocatedTeamId: Number(teamId),
        ...(worker && { allocatedWorkerId: Number(worker) }),
        ragRating: priority,
        allocationStartDate: format(allocationDate, 'yyyy-MM-dd'),
      });

      push(`/people/${personId}`);
    } catch (e) {
      setPostError(true);
    }
    setPostLoading(false);
  }, [priority, allocationDate, worker, personId, teamId, push]);
  useEffect(() => {
    setPostError(null);
  }, [query]);
  if (errorTeams || errorWorkers || postError) {
    return <ErrorMessage />;
  }
  if (!teams) {
    return <Spinner />;
  }
  return (
    <form role="form" onSubmit={handleSubmit(addWorker)}>
      {teams && (
        <Autocomplete
          name="teamId"
          label="Select a team"
          labelSize="m"
          placeholder="Select or type team name"
          control={control}
          options={teams.map(({ id, name }) => ({
            value: id,
            text: name,
          }))}
          onChange={(value: string | number | null) => {
            setWorker(null);
            replace(
              {
                pathname,
                query: { id: personId, teamId: value },
              },
              undefined,
              { scroll: false }
            );
          }}
          required
        />
      )}
      <Radios
        name="priority"
        label="Choose a priority rating"
        options={[
          { value: 'purple', text: 'Urgent priority' },
          { value: 'red', text: 'High priority' },
          { value: 'amber', text: 'Medium priority' },
          { value: 'green', text: 'Low priority' },
          { value: 'white', text: 'No priority' },
        ]}
        onChange={(elm) => {
          setPriority(elm.target.value);
        }}
        required
      />

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

      {!workerAllocation && teamId && workers && workers.length > 0 ? (
        <button
          className={`lbh-link ${s.addPersonLink}`}
          data-testid="allocate_worker_link"
          onClick={() => setWorkerAllocation(true)}
        >
          + Allocate a worker
        </button>
      ) : (
        <></>
      )}

      {workerAllocation && workers && workers.length > 0 ? (
        <>
          <SelectWorker
            records={workers}
            callback={(value: any) => setWorker(value)}
          />
          <button
            className={`lbh-link ${s.addPersonLink}`}
            onClick={() => {
              setWorkerAllocation(false);
              setWorker(null);
            }}
          >
            - Clear selection
          </button>
          <br />
        </>
      ) : (
        <></>
      )}
      <br />

      <Button
        label="Continue"
        type="submit"
        disabled={postLoading || !priority || !teamId}
      />

      {teamId && (!teams || !workers) && <Spinner />}
    </form>
  );
};

export default AddAllocation;
