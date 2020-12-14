import cx from 'classnames';
import PropTypes from 'prop-types';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import NATIONALITIES from 'data/nationalities';

const NationalityList = ({
  label,
  register,
  labelSize = 'm',
  hint,
  name,
  required,
  onChange,
  error,
}) => (
  <div
    className={cx('govuk-form-group', {
      'govuk-form-group--error': error,
    })}
  >
    <label
      className={`govuk-label govuk-label--${labelSize}`}
      htmlFor="nationality"
    >
      {label} <span className="govuk-required">{required ? '*' : null}</span>
    </label>

    {error && <ErrorMessage label={error.message} />}
    <select
      className="govuk-select"
      id={name}
      name={name}
      ref={register}
      aria-describedby={hint && `${name}-hint`}
      onChange={(e) => onChange && onChange(e.target.value)}
    >
      <option value="">-- select one --</option>
      <option value="british" key="british">
        British
      </option>
      {NATIONALITIES.map((data) => (
        <option key={data} value={data}>
          {data}
        </option>
      ))}
    </select>
  </div>
);

NationalityList.propTypes = {
  label: PropTypes.string.isRequired,
  labelSize: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  register: PropTypes.func,
  name: PropTypes.string.isRequired,
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),
  hint: PropTypes.string,
  required: PropTypes.bool,
};
export default NationalityList;
