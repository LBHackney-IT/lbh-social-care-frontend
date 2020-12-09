import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getResident } from 'utils/api/residents';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import PersonDetails from './PersonDetails';

const PersonView = ({ personId, expandView }) => {
  const [person, setPerson] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const getPerson = async (personId) => {
    setLoading(false);
    try {
      const data = await getResident(personId);
      setPerson(data);
      setError(null);
    } catch (e) {
      setPerson(null);
      setError(e.response.data);
    }
  };
  useEffect(() => {
    setLoading(true);
    getPerson(personId);
  }, [personId]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
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
