import cx from 'classnames';
import Router from 'next/router';

const handleLink = (url: string) => window.open(url, '_blank');

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  onClick?: () => unknown;
  isSecondary?: boolean;
  className?: string;
  route?: string;
  internalQuery?: string;
  wideButton?: boolean;
}

const Button = ({
  onClick,
  label,
  isSecondary,
  className,
  route,
  internalQuery,
  wideButton,
  ...otherProps
}: Props): React.ReactElement => {
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
      style={wideButton ? { minWidth: '200px' } : {}}
      className={cx(
        'lbh-button govuk-button',
        {
          'lbh-button--secondary': isSecondary,
        },
        className
      )}
      data-module="govuk-button"
      onClick={handleClick}
      {...otherProps}
    >
      {label}
    </button>
  );
};

export default Button;
