import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button, Radios } from 'components/Form';
import Modal from 'components/Modal/Modal';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAuth } from 'components/UserContext/UserContext';
import {
  getTeams,
  getTeamWorkers,
  addAllocatedWorker,
} from 'utils/api/allocatedWorkers';

const AddAllocatedWorker = ({ personId, currentlyAllocated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState();
  const [workers, setWorkers] = useState();
  const [error, setError] = useState();
  const [postError, setPostError] = useState();
  const [postLoading, setPostLoading] = useState();
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
  const selectedTeam = watch('team');
  const getAllocatedWorkers = useCallback(async () => {
    setWorkers();
    try {
      const data = await getTeamWorkers(selectedTeam);
      setWorkers(data.workers);
    } catch (e) {
      setError(true);
    }
  });
  useEffect(() => {
    selectedTeam && getAllocatedWorkers();
  }, [selectedTeam]);
  if (error) {
    return 'Oops an error occurred';
  }
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setWorkers();
  });
  const addWorker = useCallback(async (formData) => {
    setPostLoading(true);
    setPostError();
    try {
      await addAllocatedWorker(personId, { user: user.email, ...formData });
      closeModal();
    } catch (e) {
      setPostError(true);
    }
    setPostLoading(false);
  });
  return (
    <>
      <div className="lbh-table-header">
        <h3 className="govuk-fieldset__legend--m govuk-custom-text-color govuk-!-margin-top-0">
          Allocated Worker {currentlyAllocated + 1}
        </h3>
        <Button
          label="Allocate worker"
          isSecondary
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <hr className="govuk-divider" />
      <p>
        <i>{currentlyAllocated === 0 ? 'Currently unallocated' : 'Optional'}</i>
      </p>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2 className="govuk-heading-l">Allocate worker</h2>
        <form role="form" onSubmit={handleSubmit(addWorker)}>
          {teams && (
            <Radios
              name="team"
              label="Select a team to view workers for that team"
              labelSize="s"
              options={teams.map(({ id, name }) => ({
                value: id,
                text: name,
              }))}
              register={register({ required: true })}
            />
          )}
          {workers && (
            <>
              <h3>Information and Assessment workers</h3>
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
                  {workers.map(({ firstName, lastName, id, totalcases }) => (
                    <tr className="govuk-table__row govuk-radios" key={id}>
                      <td className="govuk-table__cell">
                        <div className="govuk-radios__item">
                          <input
                            aria-labelledby={`worker_${id}`}
                            className="govuk-radios__input"
                            name="worker"
                            type="radio"
                            value={id}
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
                          rel="noopener"
                          target="_blank"
                        >
                          {firstName} {lastName}
                        </a>
                      </td>
                      <td className="govuk-table__cell govuk-table__cell--numeric">
                        {totalcases}
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
          {selectedTeam && (!teams || !workers) && <Spinner />}
        </form>
      </Modal>
    </>
  );
};

AddAllocatedWorker.propTypes = {
  personId: PropTypes.string.isRequired,
  currentlyAllocated: PropTypes.number.isRequired,
};

export default AddAllocatedWorker;
