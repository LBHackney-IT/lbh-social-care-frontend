import cx from 'classnames';
import PropTypes from 'prop-types';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

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
}) => (
  <div
    style={style}
    className={cx(`govuk-form-group govuk-grid-column-${govGrid}`, {
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
    {children}
    {error && <ErrorMessage label={error.message} />}
    <select
      style={{ width: '100%' }}
      className={`govuk-select width-override-${width}`}
      id={name}
      data-testid={name}
      name={name}
      ref={rules ? register?.(rules) : register}
      aria-describedby={hint && `${name}-hint`}
      onChange={(e) => onChange && onChange(e.target.value)}
      value={ignoreValue ? undefined : value}
    >
      {isUnselectable && (
        <option key="empty" value="">
          {placeHolder ? placeHolder : required ? '-- select one --' : ''}
        </option>
      )}
      {options.map((option) => {
        const { value, text } =
          typeof option === 'string' ? { value: option, text: option } : option;
        return (
          <option key={value} value={value}>
            {text}
          </option>
        );
      })}
    </select>
  </div>
);

Select.propTypes = {
  rules: PropTypes.shape(),
  label: PropTypes.string,
  labelSize: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  required: PropTypes.bool,
  placeHolder: PropTypes.string,
  selected: PropTypes.string,
  register: PropTypes.func,
  children: PropTypes.node,
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),
};

export default Select;
