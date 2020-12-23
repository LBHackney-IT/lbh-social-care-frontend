import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { getResident } from 'utils/api/residents';
import PersonDetails from './PersonDetails';
import AllocatedWorkers from '../AllocatedWorkers/AllocatedWorkers';

const PersonView = ({ personId, expandView }) => {
  const [person, setPerson] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const getPerson = async () => {
    try {
      const data = await getResident(personId);
      setPerson(data);
      setError(null);
    } catch (e) {
      setPerson(null);
      setError(e.response?.data?.message || 'Oops an error occurred');
    }
    setLoading(false);
  };
  useEffect(() => {
    getPerson();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {error && <ErrorMessage label={error} />}
          {person && (
            <>
              {!expandView && (
                <h1 className="govuk-fieldset__legend--l gov-weight-lighter govuk-expand-title">
                  {person.firstName} {person.lastName}
                </h1>
              )}
              <PersonDetails {...person} expandView={expandView} />
              <AllocatedWorkers id={personId} />
            </>
          )}
        </>
      )}
    </>
  );
};

PersonView.propTypes = {
  expandView: PropTypes.bool,
  personId: PropTypes.string.isRequired,
};

export default PersonView;
