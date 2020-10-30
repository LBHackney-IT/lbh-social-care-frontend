import cx from 'classnames';

const DatePicker = ({
  name,
  register,
  error,
  required,
  hint,
  label,
  labelSize = 'm',
}) => {
  return (
    <div
      className={cx('govuk-form-group', {
        'govuk-form-group--error': error,
      })}
    >
      <label className={`govuk-label govuk-label--${labelSize}`} htmlFor={name}>
        {label} <span className="govuk-required">{required ? '*' : null}</span>
      </label>
      {hint && (
        <span id={`${name}-hint`} className="govuk-hint">
          {hint}
        </span>
      )}
      {error && <ErrorMessage label={error.message} />}
      <input
        id={name}
        className={cx(`govuk-input govuk-input--width-10`, {
          'govuk-input--error': error,
        })}
        type="date"
        ref={register}
        name={name}
      />
    </div>
  );
};
export default DatePicker;
