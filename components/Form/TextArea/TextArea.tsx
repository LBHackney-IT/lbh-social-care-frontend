import cx from 'classnames';

import type { TextArea as Props } from 'components/Form/types';

const TextArea = ({
  label,
  labelSize = 'm',
  hint,
  name,
  error,
  register,
  width,
  rules,
  rows = 5,
  ...otherProps
}: Props): React.ReactElement => (
  <div
    className={cx('govuk-form-group', {
      'govuk-form-group--error': Boolean(error),
    })}
  >
    {label && (
      <label className={`govuk-label govuk-label--${labelSize}`} htmlFor={name}>
        {label}
      </label>
    )}
    {hint && (
      <span id={`${name}-hint`} className="govuk-hint">
        {hint}
      </span>
    )}
    {error && (
      <span id={`${name}-error`} className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {error.message}
      </span>
    )}
    <textarea
      className={cx('govuk-textarea', {
        'govuk-textarea--error': Boolean(error),
        [`govuk-input--width-${width}`]: width,
      })}
      id={name}
      name={name}
      rows={rows}
      aria-describedby={`${name}-hint ${name}-error`}
      ref={rules ? register?.(rules) : register}
      {...otherProps}
    />
  </div>
);

export default TextArea;
