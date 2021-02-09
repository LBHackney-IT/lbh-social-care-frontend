import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Radios } from 'components/Form';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAuth } from 'components/UserContext/UserContext';
import {
  getTeams,
  getTeamWorkers,
  addAllocatedWorker,
} from 'utils/api/allocatedWorkers';

const AddAllocatedWorker = ({ personId }) => {
  const [workersLoading, setWorkersLoading] = useState(false);
  const [teams, setTeams] = useState();
  const [workers, setWorkers] = useState();
  const [error, setError] = useState();
  const [postError, setPostError] = useState();
  const [postLoading, setPostLoading] = useState();
  const { push } = useRouter();
  const { handleSubmit, register, watch } = useForm({
    mode: 'onChange',
  });
  const { user } = useAuth();
  const getAllocatedTeams = useCallback(async () => {
    try {
      const data = await getTeams();
      setTeams(data.teams);
    } catch (e) {
      setError(true);
    }
  });
  useEffect(() => {
    getAllocatedTeams();
  }, []);
  const formValues = watch();
  const getAllocatedWorkers = useCallback(async (selectedTeam) => {
    setWorkersLoading(true);
    try {
      const data = await getTeamWorkers(selectedTeam);
      setWorkers(data.workers);
    } catch (e) {
      setError(true);
    }
    setWorkersLoading();
  });
  useEffect(() => {
    formValues.team && getAllocatedWorkers(formValues.team);
  }, [formValues.team]);
  useEffect(() => {
    setPostError();
  }, [formValues.team, formValues.worker]);
  const addWorker = useCallback(async ({ worker }) => {
    setPostLoading(true);
    setPostError();
    try {
      await addAllocatedWorker(personId, {
        allocatedBy: user.email,
        allocatedWorkerId: worker,
      });
      push(`/people/${personId}`);
    } catch (e) {
      setPostError(true);
    }
    setPostLoading(false);
  });
  if (error) {
    return <ErrorMessage label="Oops an error occurred" />;
  }
  return (
    <form role="form" onSubmit={handleSubmit(addWorker)}>
      {teams && (
        <Radios
          name="team"
          label="Select a team to view workers for that team"
          labelSize="m"
          options={teams.map(({ id, name }) => ({
            value: id,
            text: name,
          }))}
          register={register({ required: true })}
        />
      )}
      {workers && (
        <>
          <h2>
            {teams.find(({ id }) => id.toString() === formValues.team)?.name}{' '}
            workers
          </h2>
          <p className="govuk-body">
            Select a worker to allocate a case to them. You can view more about
            a worker’s current allocated cases by selecting their name.
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
              {workers.map(({ firstName, lastName, id, allocationCount }) => (
                <tr className="govuk-table__row govuk-radios" key={id}>
                  <td className="govuk-table__cell">
                    <div className="govuk-radios__item">
                      <input
                        aria-labelledby={`worker_${id}`}
                        className="govuk-radios__input"
                        name="worker"
                        type="radio"
                        value={id}
                        disabled={workersLoading}
                        ref={register}
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
              ))}
            </tbody>
          </table>
          <Button
            label="Allocate worker"
            type="submit"
            disabled={postLoading}
          />
          {postError && (
            <ErrorMessage label="There was an error allocating the worker. Please retry." />
          )}
        </>
      )}
      {formValues.team && (!teams || !workers) && <Spinner />}
    </form>
  );
};

AddAllocatedWorker.propTypes = {
  personId: PropTypes.string.isRequired,
};

export default AddAllocatedWorker;
