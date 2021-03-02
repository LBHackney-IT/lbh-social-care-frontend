import cx from 'classnames';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import type { TextInput as Props } from 'components/Form/types';

const TextInput = ({
  label,
  hint,
  name,
  register,
  rules,
  error,
  type = 'text',
  inputClassName,
  labelSize = 'm',
  required,
  width,
  ...otherProps
}: Props): React.ReactElement => (
  <div
    className={cx('govuk-form-group', {
      'govuk-form-group--error': error,
    })}
  >
    <label className={`govuk-label govuk-label--${labelSize}`} htmlFor={name}>
      {label} {required && <span className="govuk-required">*</span>}
    </label>
    {hint && (
      <span id={`${name}-hint`} className="govuk-hint">
        {hint}
      </span>
    )}
    {error && <ErrorMessage label={error.message} />}
    <input
      className={cx(`govuk-input`, inputClassName, {
        [`govuk-input--width-${width}`]: width,
        'govuk-input--error': error,
      })}
      id={name}
      data-testid={name}
      name={name}
      type={type}
      ref={rules ? register?.(rules) : register}
      aria-describedby={hint && `${name}-hint`}
      {...otherProps}
    />
  </div>
);

export default TextInput;
