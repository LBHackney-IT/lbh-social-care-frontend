import { useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Controller } from 'react-hook-form';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import {
  convertFormat,
  isDateValid,
  stringDateToObject,
  objectDateToString,
} from 'utils/date';

const DateInput = forwardRef(
  (
    {
      label,
      labelSize = 'm',
      error,
      hint,
      value,
      name,
      onChange,
      required,
      format,
      ...otherProps
    },
    ref
  ) => {
    const date = stringDateToObject(value, format);
    const setNewDate = useCallback(
      (newDate) =>
        onChange(objectDateToString({ ...date, ...newDate }, format)),
      [date, format, onChange]
    );
    return (
      <div
        className={cx('govuk-form-group', {
          'govuk-form-group--error': error,
        })}
      >
        <fieldset
          className="govuk-fieldset"
          role="group"
          aria-describedby={`${name}-hint`}
        >
          <legend
            className={`govuk-fieldset__legend govuk-fieldset__legend--${labelSize}`}
          >
            {label} {required && <span className="govuk-required">*</span>}
          </legend>
          <span id={`${name}-hint`} className="govuk-hint">
            {hint}
          </span>
          {error && <ErrorMessage label={error.message} />}
          <div className="govuk-date-input" id={name}>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor={`${name}-day`}
                >
                  Day
                </label>
                <input
                  className={cx(
                    'govuk-input govuk-date-input__input govuk-input--width-2',
                    {
                      'govuk-input--error': error,
                    }
                  )}
                  id={`${name}-day`}
                  name={`${name}-day`}
                  type="text"
                  pattern="^\d{2}$"
                  inputMode="numeric"
                  defaultValue={date.day}
                  onChange={({ target: { value } }) =>
                    setNewDate({ day: value })
                  }
                  ref={ref}
                  {...otherProps}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor={`${name}-month`}
                >
                  Month
                </label>
                <input
                  className={cx(
                    'govuk-input govuk-date-input__input govuk-input--width-2',
                    {
                      'govuk-input--error': error,
                    }
                  )}
                  id={`${name}-month`}
                  name={`${name}-month`}
                  type="text"
                  pattern="^\d{2}$"
                  inputMode="numeric"
                  defaultValue={date.month}
                  onChange={({ target: { value } }) =>
                    setNewDate({ month: value })
                  }
                  {...otherProps}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor={`${name}-year`}
                >
                  Year
                </label>
                <input
                  className={cx(
                    'govuk-input govuk-date-input__input govuk-input--width-4',
                    {
                      'govuk-input--error': error,
                    }
                  )}
                  id={`${name}-year`}
                  name={`${name}-year`}
                  type="text"
                  pattern="^\d{4}$"
                  inputMode="numeric"
                  defaultValue={date.year}
                  onChange={({ target: { value } }) =>
                    setNewDate({ year: value })
                  }
                  {...otherProps}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
);

DateInput.propTypes = {
  label: PropTypes.string,
  labelSize: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  hint: PropTypes.string,
  rules: PropTypes.shape({}),
  format: PropTypes.oneOf(['EU', 'US']),
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),
};

const ControlledDateInput = ({
  control,
  name,
  rules,
  format = 'US',
  ...otherProps
}) => (
  <Controller
    as={<DateInput format={format} {...otherProps} />}
    name={name}
    rules={{
      ...rules,
      validate: {
        valid: (value) =>
          value &&
          (isDateValid(format === 'US' ? value : convertFormat(value)) ||
            'Must be a valid Date'),
        ...rules?.validate,
      },
    }}
    control={control}
    defaultValue={null}
  />
);

ControlledDateInput.propTypes = {
  name: PropTypes.string.isRequired,
  rules: PropTypes.shape({ validate: PropTypes.object }),
  control: PropTypes.object.isRequired,
  format: PropTypes.oneOf(['EU', 'US']),
};

export default ControlledDateInput;
