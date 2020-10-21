import PropTypes from 'prop-types';
import cx from 'classnames';

const ErrorMessage = ({ children, className }) => (
  <span className={cx('govuk-error-message', className)}>
    <span className="govuk-visually-hidden">Error:</span> {children}
  </span>
);

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default ErrorMessage;
