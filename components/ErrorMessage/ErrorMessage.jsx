import PropTypes from 'prop-types';
import cx from 'classnames';

const ErrorMessage = ({ label = 'Oops an error occurred', className }) => (
  <span className={cx('govuk-error-message', className)}>
    <span className="govuk-visually-hidden">Error:</span> {label}
  </span>
);

ErrorMessage.propTypes = {
  label: PropTypes.node,
  className: PropTypes.string,
};

export default ErrorMessage;
