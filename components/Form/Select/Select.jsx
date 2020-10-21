import cx from 'classnames';
import PropTypes from 'prop-types';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const Select = ({
  label,
  hint,
  name,
  options,
  onChange,
  register,
  error,
  children,
  isUnselectable = true,
  ignoreValue,
  value
}) => (
  <div
    className={cx('govuk-form-group', {
      'govuk-form-group--error': error
    })}
  >
    <label className="govuk-label govuk-label--m" htmlFor={name}>
      {label}
    </label>
    {hint && (
      <span id={`${name}-hint`} className="govuk-hint">
        {hint}
      </span>
    )}
    {children}
    {error && <ErrorMessage text={error.message} />}
    <select
      className="govuk-select"
      id={name}
      name={name}
      ref={register}
      aria-describedby={hint && `${name}-hint`}
      onChange={e => onChange && onChange(e.target.value)}
      value={ignoreValue ? undefined : value}
    >
      {isUnselectable && <option key="empty" value=""></option>}
      {options.map(option => {
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
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    ])
  ),
  selected: PropTypes.string,
  register: PropTypes.func,
  children: PropTypes.node,
  error: PropTypes.shape({ message: PropTypes.string.isRequired })
};

export default Select;
