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
  required,
  rows = 5,
  ...otherProps
}: Props): React.ReactElement => (
  <div
    className={cx('lbh-form-group govuk-form-group', {
      'govuk-form-group--error': Boolean(error),
    })}
  >
    {label && (
      <label className={`lbh-label govuk-label`} htmlFor={name}>
        {label} {required && <span className="govuk-required">*</span>}
      </label>
    )}
    {hint && (
      <span id={`${name}-hint`} className="lbh-hint govuk-hint">
        {hint}
      </span>
    )}
    {error && (
      <span id={`${name}-error`} className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {error.message}
      </span>
    )}
    <textarea
      className={cx('lbh-textarea govuk-textarea', {
        'govuk-textarea--error': Boolean(error),
        [`govuk-input--width-${width}`]: width,
      })}
      id={name}
      name={name}
      rows={rows}
      aria-describedby={hint && `${name}-hint`}
      ref={rules ? register?.(rules) : register}
      {...otherProps}
    />
  </div>
);

export default TextArea;
