import cx from 'classnames';
import PropTypes from 'prop-types';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const defaultOptions = ['Yes', 'No'];

const ConditionalComponent = ({
  label,
  labelSize = 'm',
  hint,
  name,
  options = defaultOptions,
  register,
  error,
  required,
  isRadiosInline = true,
  ...otherProps
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
      <div
        className={cx('govuk-radios', {
          'govuk-radios--inline': isRadiosInline,
        })}
      >
        {options.map((option) => (
          <div className="govuk-radios__item" key={option}>
            <input
              className={cx('govuk-radios__input', {
                'govuk-input--error': error,
              })}
              id={`${name}_${option}`}
              name={`${name}`}
              type="radio"
              value={option}
              ref={register}
              aria-describedby={hint && `${name}-hint`}
              {...otherProps}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor={`${name}_${option}`}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
ConditionalComponent.propTypes = {
  label: PropTypes.string.isRequired,
  labelSize: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  options: PropTypes.array,
  hint: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),
};

export default ConditionalComponent;
