import cx from 'classnames';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import type { Radios as Props } from 'components/Form/types';

const defaultOptions = ['Yes', 'No'];

const Radios = ({
  label,
  labelSize = 'm',
  hint,
  name,
  options = defaultOptions,
  register,
  error,
  children,
  required,
  rules,
  isRadiosInline = false,
  ...otherProps
}: Props): React.ReactElement => (
  <div
    className={cx('govuk-form-group lbh-form-group', {
      'govuk-form-group--error': error,
    })}
  >
    <label className={`govuk-label govuk-label--${labelSize}`} htmlFor={name}>
      {label} {required && <span className="govuk-required">*</span>}
    </label>
    {hint && (
      <span id={`${name}-hint`} className="lbh-hint">
        {hint}
      </span>
    )}
    {children}
    {error && <ErrorMessage label={error.message} />}
    <div
      className={cx('govuk-radios lbh-radios', {
        'govuk-radios--inline': isRadiosInline,
      })}
    >
      {options.map((option) => {
        const { value, text } =
          typeof option === 'string' ? { value: option, text: option } : option;
        return (
          <div className="govuk-radios__item" key={text}>
            <input
              className={cx('govuk-radios__input', {
                'govuk-input--error': error,
              })}
              id={`${name}_${value}`}
              name={name}
              type="radio"
              value={value}
              ref={rules ? register?.(rules) : register}
              aria-describedby={hint && `${name}-hint`}
              {...otherProps}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor={`${name}_${value}`}
            >
              {text}
            </label>
          </div>
        );
      })}
    </div>
  </div>
);

export default Radios;
