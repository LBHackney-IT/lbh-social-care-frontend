import PropTypes from 'prop-types';

const AdminLogin = ({ submitText, gssoUrl }) => {
  return (
    <div>
      <a className="govuk-button" href={gssoUrl}>
        {submitText}
      </a>
    </div>
  );
};

AdminLogin.propTypes = {
  gssoUrl: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default AdminLogin;
