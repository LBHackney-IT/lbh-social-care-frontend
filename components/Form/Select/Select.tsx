import cx from 'classnames';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import type { Select as Props } from 'components/Form/types';

import styles from './Select.module.scss';

const Select = ({
  label,
  labelSize = 'm',
  hint,
  name,
  options,
  onChange,
  placeHolder,
  register,
  required,
  error,
  children,
  isUnselectable = true,
  ignoreValue,
  value,
  style,
  rules,
  width = 20,
  govGrid,
}: Props): React.ReactElement | null => {
  if (!Array.isArray(options)) {
    return null;
  }
  return (
    <div
      style={style}
      className={cx(
        `govuk-form-group lbh-form-group govuk-grid-column-${govGrid}`,
        {
          'govuk-form-group--error': error,
        }
      )}
    >
      <label className={`govuk-label lbh-label`} htmlFor={name}>
        {label} {required && <span className="govuk-required">*</span>}
      </label>
      <div className={styles.inputContainer}>
        {hint && (
          <span id={`${name}-hint`} className="govuk-hint">
            {hint}
          </span>
        )}
        {children}
        {error && <ErrorMessage label={error.message} />}
        <select
          style={{ width: '100%' }}
          className={`govuk-select lbh-select width-override-${width}`}
          id={name}
          data-testid={name}
          name={name}
          ref={rules ? register?.(rules) : register}
          aria-describedby={hint && `${name}-hint`}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onChange && onChange(e.target.value)
          }
          value={ignoreValue ? undefined : value}
        >
          {isUnselectable && (
            <option key="empty" value="">
              {placeHolder ? placeHolder : required ? '-- select one --' : ''}
            </option>
          )}
          {options.map((option) => {
            const { value, text } =
              typeof option === 'string'
                ? { value: option, text: option }
                : option;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Select;
