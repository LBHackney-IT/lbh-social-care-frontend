import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Radios } from 'components/Form';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAuth } from 'components/UserContext/UserContext';
import {
  useTeams,
  useTeamWorkers,
  addAllocatedWorker,
} from 'utils/api/allocatedWorkers';

const AddAllocatedWorker = ({ personId, ageContext }) => {
  const [postError, setPostError] = useState();
  const [postLoading, setPostLoading] = useState();
  const { query, push, replace, pathname } = useRouter();
  const { handleSubmit, register } = useForm({
    defaultValues: query,
  });
  const { user } = useAuth();
  const { data: { teams } = {}, error: errorTeams } = useTeams({ ageContext });
  const { data: { workers } = {}, error: errorWorkers } = useTeamWorkers(
    query?.teamId
  );
  const addWorker = useCallback(
    async ({ teamId, workerId }) => {
      setPostLoading(true);
      setPostError();
      try {
        await addAllocatedWorker(personId, {
          allocatedBy: user.email,
          allocatedTeamId: teamId,
          allocatedWorkerId: workerId,
        });
        push(`/people/${personId}`);
      } catch (e) {
        setPostError(true);
      }
      setPostLoading(false);
    },
    [personId, push, user.email]
  );
  useEffect(() => {
    setPostError();
  }, [query]);
  if (errorTeams | errorWorkers) {
    return <ErrorMessage label="Oops an error occurred" />;
  }
  if (!teams) {
    return <Spinner />;
  }
  return (
    <form role="form" onSubmit={handleSubmit(addWorker)}>
      {teams && (
        <Radios
          name="teamId"
          label="Select a team to view workers for that team"
          labelSize="m"
          options={teams.map(({ id, name }) => ({
            value: id,
            text: name,
          }))}
          onChange={(e) =>
            replace(
              {
                pathname,
                query: { id: personId, teamId: e.target.value },
              },
              null,
              { scroll: false }
            )
          }
          register={register}
        />
      )}
      {workers && (
        <>
          <h2>
            {teams?.find(({ id }) => id.toString() === query?.teamId)?.name}{' '}
            workers
          </h2>
          {workers?.length > 0 ? (
            <>
              <p className="govuk-body">
                Select a worker to allocate a case to them. You can view more
                about a worker’s current allocated cases by selecting their
                name.
              </p>
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
                                  null,
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
            <ErrorMessage label="There was an error allocating the worker. Please retry." />
          )}
        </>
      )}
      {query?.teamId && (!teams || !workers) && <Spinner />}
    </form>
  );
};

AddAllocatedWorker.propTypes = {
  personId: PropTypes.string.isRequired,
  ageContext: PropTypes.oneOf(['A', 'C']).isRequired,
};

export default AddAllocatedWorker;
