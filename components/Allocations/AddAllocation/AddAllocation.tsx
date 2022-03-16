import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Autocomplete } from 'components/Form';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useTeams, useTeamWorkers } from 'utils/api/allocatedWorkers';
import { AgeContext } from 'types';
import DateInput from 'components/Form/DateInput/DateInput';
import Radios from 'components/Form/Radios/Radios';
import { allocateResident } from '../../../lib/allocations';

interface Props {
  personId: number;
  ageContext: AgeContext;
}

const AddAllocation = ({ personId, ageContext }: Props): React.ReactElement => {
  const [postError, setPostError] = useState<boolean | null>();
  const [postLoading, setPostLoading] = useState<boolean>();
  const { query, push, replace, pathname } = useRouter();
  const { handleSubmit, control, errors } = useForm({
    defaultValues: query,
  });
  const { teamId } = query as { teamId?: number };
  const { data: { teams } = {}, error: errorTeams } = useTeams({ ageContext });
  const { data: workers, error: errorWorkers } = useTeamWorkers(teamId);
  const addWorker = useCallback(
    async ({ workerId, allocationStartDate }) => {
      setPostLoading(true);
      setPostError(null);
      try {
        await allocateResident({
          personId: Number(personId),
          allocatedTeamId: Number(teamId),
          workerId: Number(workerId),
          createdBy: Number(),
          summary: '',
          carePackage: '',
          ragRating: 'purple',
          allocationDate: allocationStartDate,
        });
        push(`/people/${personId}`);
      } catch (e) {
        setPostError(true);
      }
      setPostLoading(false);
    },
    [personId, teamId, push]
  );
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

      {console.log(workers)}

      <Radios
        name="priority"
        label="Choose a priority rating"
        options={[
          'Urgent priority',
          'High priority',
          'Medium priority',
          'Low priority',
        ]}
        onChange={(elm) => {
          console.log('change', elm.target.value);
        }}
        required
      />

      <DateInput
        label="Select an allocation date"
        labelSize="s"
        name="allocationStartDate"
        error={errors.allocationStartDate}
        control={control}
        required
      />

      {workers && workers.workers.length && (
        <Autocomplete
          name="workerId"
          label="Select a worker"
          labelSize="m"
          placeholder="Select or type worker name"
          control={control}
          options={workers.workers.map(({ id, firstName, lastName }) => ({
            value: id,
            text: `${firstName} ${lastName}`,
          }))}
          onChange={(value: string | number | null) => {
            replace(
              {
                pathname,
                query: { id: personId, teamId: value },
              },
              undefined,
              { scroll: false }
            );
          }}
        />
      )}

      <Button label="Continue" type="submit" disabled={postLoading} />
      {teamId && (!teams || !workers) && <Spinner />}
    </form>
  );
};

export default AddAllocation;
