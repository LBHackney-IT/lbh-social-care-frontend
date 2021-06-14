import cx from 'classnames';

export interface Props {
  label?: string;
  className?: string;
}

const ErrorMessage = ({
  label = 'There was a problem. Please refresh the page or try again later.',
  className,
}: Props): React.ReactElement => (
  <span className={cx('govuk-error-message', className)}>
    <span className="govuk-visually-hidden">Error:</span> {label}
  </span>
);

export default ErrorMessage;
