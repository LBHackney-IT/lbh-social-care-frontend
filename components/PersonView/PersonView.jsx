import PropTypes from 'prop-types';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import PersonDetails from './PersonDetails';
import { useResident } from 'utils/api/residents';

const PersonView = ({ personId, expandView, children }) => {
  const { data: person, error } = useResident(personId);
  if (error) {
    return <ErrorMessage />;
  }
  if (!person) {
    return <Spinner />;
  }
  return (
    <>
      {!expandView && (
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter govuk-expand-title">
          {person.firstName} {person.lastName}
        </h1>
      )}
      <PersonDetails {...person} expandView={expandView} />
      {typeof children === 'function' ? children(person) : children}
    </>
  );
};

PersonView.propTypes = {
  expandView: PropTypes.bool,
  personId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default PersonView;
