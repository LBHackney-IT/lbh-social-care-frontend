import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Autocomplete } from 'components/Form';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useTeams, useTeamWorkers } from 'utils/api/allocatedWorkers';
import { AgeContext, User } from 'types';
import DatePicker from 'components/Form/DatePicker/DatePicker';
import Radios from 'components/Form/Radios/Radios';
import SelectWorker from './SelectWorker';
import { allocateResident } from '../../../lib/allocations';
import { useAuth } from 'components/UserContext/UserContext';

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
  const { user } = useAuth() as { user: User };

  const addWorker = useCallback(async () => {
    setPostLoading(true);
    setPostError(null);
    try {
      await allocateResident({
        personId: Number(personId),
        allocatedTeamId: Number(teamId),
        ...(worker && { workerId: 5 }),
        workerId: workerAllocation ? Number(worker) : null,
        createdBy: user.email,
        ragRating: 'purple',
        allocationDate: allocationDate,
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
          console.log('change', elm.target.value);
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

      {!workerAllocation ? (
        <a className="lbh-link" onClick={() => setWorkerAllocation(true)}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="7" width="1" height="15" fill="#025EA6" />
            <rect
              x="15"
              y="7"
              width="1"
              height="15"
              transform="rotate(90 15 7)"
              fill="#025EA6"
            />
          </svg>
          View
        </a>
      ) : (
        <></>
      )}

      {workerAllocation && workers?.workers ? (
        <>
          <SelectWorker
            records={workers?.workers}
            callback={(value: any) => setWorker(value)}
          />
          <a
            className="lbh-link"
            onClick={() => {
              setWorkerAllocation(false);
              setWorker(null);
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="7" width="1" height="15" fill="#025EA6" />
              <rect
                x="15"
                y="7"
                width="1"
                height="15"
                transform="rotate(90 15 7)"
                fill="#025EA6"
              />
            </svg>
            hide
          </a>
        </>
      ) : (
        <></>
      )}

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
