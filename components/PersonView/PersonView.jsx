import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { getResident } from 'utils/api/residents';
import PersonDetails from './PersonDetails';

const PersonView = ({ personId, expandView, children }) => {
  const [person, setPerson] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const getPerson = async () => {
    try {
      const data = await getResident(personId);
      setPerson(data);
      setError(false);
    } catch (e) {
      setPerson(null);
      setError(true);
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
          {error && <ErrorMessage />}
          {person && (
            <>
              {!expandView && (
                <h1 className="govuk-fieldset__legend--l gov-weight-lighter govuk-expand-title">
                  {person.firstName} {person.lastName}
                </h1>
              )}
              <PersonDetails {...person} expandView={expandView} />
              {typeof children === 'function' ? children(person) : children}
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default PersonView;
