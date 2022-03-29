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
import DateInput from 'components/Form/DateInput/DateInput';

interface Props {
  personId: number;
  ageContext: AgeContext;
}

const AddAllocatedWorker = ({
  personId,
  ageContext,
}: Props): React.ReactElement => {
  const [postError, setPostError] = useState<boolean | null>();
  const [postLoading, setPostLoading] = useState<boolean>();
  const { query, push, replace, pathname } = useRouter();
  const { handleSubmit, register, control, errors } = useForm({
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
        await addAllocatedWorker(personId, {
          allocatedTeamId: Number(teamId),
          allocatedWorkerId: Number(workerId),
          ragRating: 'none',
          allocationStartDate,
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
  if (errorTeams || errorWorkers) {
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
          label="Select a team to view workers for that team"
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
        />
      )}
      {workers && (
        <>
          <h2>{teams?.find(({ id }) => id === teamId)?.name} workers</h2>
          {workers?.length > 0 ? (
            <>
              <p className="govuk-body">
                Select a worker to allocate a case to them. You can view more
                about a worker’s current allocated cases by selecting their
                name.
              </p>
              {errors.workerId && (
                <ErrorMessage label="Please select a worker." />
              )}
              <table className="govuk-table">
                <thead className="govuk-table__head">
                  <tr className="govuk-table__row">
                    <th
                      scope="col"
                      className="govuk-table__header"
                      style={{ width: '4rem' }}
                    >
                      Select
                    </th>
                    <th scope="col" className="govuk-table__header">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="govuk-table__header govuk-table__header--numeric"
                    >
                      Total Cases
                    </th>
                  </tr>
                </thead>
                <tbody className="govuk-table__body">
                  {workers.map(
                    ({ firstName, lastName, id, allocationCount }) => (
                      <tr className="govuk-table__row govuk-radios" key={id}>
                        <td className="govuk-table__cell">
                          <div className="govuk-radios__item">
                            <input
                              aria-labelledby={`worker_${id}`}
                              className="govuk-radios__input"
                              name="workerId"
                              type="radio"
                              value={id}
                              ref={register({
                                required: true,
                              })}
                              disabled={!workers}
                              onChange={(e) =>
                                replace(
                                  {
                                    pathname,
                                    query: {
                                      id: personId,
                                      ...query,
                                      workerId: e.target.value,
                                    },
                                  },
                                  undefined,
                                  { scroll: false }
                                )
                              }
                            />
                            <label className="lbh-label govuk-label govuk-radios__label"></label>
                          </div>
                        </td>
                        <td className="govuk-table__cell lbh-table__cell--va-middle">
                          <a
                            id={`worker_${id}`}
                            href={`/workers/${id}`}
                            className="govuk-link"
                          >
                            {firstName} {lastName}
                          </a>
                        </td>
                        <td className="govuk-table__cell govuk-table__cell--numeric">
                          {allocationCount}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <DateInput
                label="Allocation Start Date:"
                labelSize="s"
                name="allocationStartDate"
                error={errors.allocationStartDate}
                control={control}
                rules={{ required: 'Please select the allocation start date.' }}
              />
              <Button
                label="Allocate worker"
                type="submit"
                disabled={postLoading}
              />
            </>
          ) : (
            <p className="govuk-body">Workers not found</p>
          )}
          {postError && (
            <ErrorMessage label="There was an error allocating the worker. Please retry." />
          )}
        </>
      )}
      {teamId && (!teams || !workers) && <Spinner />}
    </form>
  );
};

export default AddAllocatedWorker;
