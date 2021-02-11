import PropTypes from 'prop-types';
import cx from 'classnames';
import Router from 'next/router';

const handleLink = (url) => window.open(url, '_blank');

const Button = ({
  onClick,
  label,
  type,
  isSecondary,
  className,
  route,
  internalQuery,
  wideButton,
  ...otherProps
}) => {
  const isExternal = route && route.includes('https://');
  const handleClick = () => {
    onClick?.();
    route &&
      (isExternal
        ? handleLink(route)
        : Router.push(internalQuery ? `${route}${internalQuery}` : `${route}`));
  };
  return (
    <button
      style={wideButton ? { minWidth: '200px' } : null}
      className={cx(
        'govuk-button',
        {
          'govuk-button--secondary': isSecondary,
        },
        className
      )}
      data-module="govuk-button"
      onClick={handleClick}
      type={type}
      {...otherProps}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.node.isRequired,
  type: PropTypes.string,
  isSecondary: PropTypes.bool,
  className: PropTypes.string,
  route: PropTypes.string,
  internalQuery: PropTypes.string,
};

export default Button;
