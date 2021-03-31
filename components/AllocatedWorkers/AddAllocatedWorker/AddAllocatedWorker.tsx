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
  const { handleSubmit, register, control } = useForm({
    defaultValues: query,
  });
  const { teamId } = query as { teamId?: number };
  const { data: { teams } = {}, error: errorTeams } = useTeams({ ageContext });
  const { data: workers, error: errorWorkers } = useTeamWorkers(teamId);
  const addWorker = useCallback(
    async ({ workerId }) => {
      setPostLoading(true);
      setPostError(null);
      try {
        await addAllocatedWorker(personId, {
          allocatedTeamId: Number(teamId),
          allocatedWorkerId: Number(workerId),
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
    return <ErrorMessage label="Oops an error occurred" />;
  }
  if (!teams) {
    return <Spinner />;
  }
  return (
    <form role="form" onSubmit={handleSubmit(addWorker)}>
      {teams && (
        <Autocomplete
          name="teamId"
          label="Choose a team to view workers for."
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
          <h2 className="lbh-heading-h3">
            {teams?.find(({ id }) => id === teamId)?.name} workers
          </h2>
          {workers?.length > 0 ? (
            <>
              <p className="lbh-body">
                Choose a worker to allocate this case to.
              </p>
              <table className="govuk-table lbh-table">
                <thead className="govuk-table__head">
                  <tr className="govuk-table__row">
                    <th
                      scope="col"
                      className="govuk-table__header"
                      style={{ width: '4rem' }}
                    >
                      <span className="govuk-visually-hidden">Select</span>
                    </th>
                    <th scope="col" className="govuk-table__header">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="govuk-table__header govuk-table__header--numeric"
                    >
                      Total cases
                    </th>
                  </tr>
                </thead>
                <tbody className="govuk-table__body">
                  {workers.map(
                    ({ firstName, lastName, id, allocationCount }) => (
                      <tr
                        className="govuk-table__row govuk-radios lbh-radios"
                        key={id}
                      >
                        <td className="govuk-table__cell">
                          <div className="govuk-radios__item">
                            <input
                              aria-labelledby={`worker_${id}`}
                              className="govuk-radios__input"
                              name="workerId"
                              type="radio"
                              value={id}
                              disabled={!workers}
                              ref={register}
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
                            <label className="govuk-label govuk-radios__label"></label>
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
            <ErrorMessage label="There was a problem allocating the worker. Please refresh the page or try again later." />
          )}
        </>
      )}
      {teamId && (!teams || !workers) && <Spinner />}
    </form>
  );
};

export default AddAllocatedWorker;
