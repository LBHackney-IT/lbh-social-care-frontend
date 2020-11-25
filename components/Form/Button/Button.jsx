import PropTypes from 'prop-types';
import cx from 'classnames';

const Button = ({
  onClick,
  label,
  type,
  isSecondary,
  className,
  ...otherProps
}) => (
  <button
    className={cx(
      'govuk-button',
      {
        'govuk-button--secondary': isSecondary,
      },
      className
    )}
    data-module="govuk-button"
    onClick={onClick}
    type={type}
    {...otherProps}
  >
    {label}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.node.isRequired,
  type: PropTypes.string,
  isSecondary: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
