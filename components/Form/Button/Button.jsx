import PropTypes from 'prop-types';
import cx from 'classnames';

const Button = ({ onClick, children, type, isSecondary, ...otherProps }) => (
  <div className="govuk-form-group">
    <button
      className={cx('govuk-button', { 'govuk-button--secondary': isSecondary })}
      data-module="govuk-button"
      onClick={onClick}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  isSecondary: PropTypes.bool
};

export default Button;
