import { useState, useEffect, forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Controller } from 'react-hook-form';
import isValid from 'date-fns/isValid';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const getInitialDate = (value) => {
  const [year = '', month = '', day = ''] = value?.split('-') || [];
  return { day, month, year };
};

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
      ...otherProps
    },
    ref
  ) => {
    const [date, setDate] = useState(getInitialDate(value));
    useEffect(() => {
      const { day, month, year } = date;
      day !== '' &&
        month !== '' &&
        year !== '' &&
        onChange(`${year}-${month}-${day}`);
      day === '' && month === '' && year === '' && onChange();
    }, [date]);
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
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={date.day}
                  onChange={({ target: { value } }) =>
                    setDate({ ...date, day: value })
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
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={date.month}
                  onChange={({ target: { value } }) =>
                    setDate({ ...date, month: value })
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
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={date.year}
                  onChange={({ target: { value } }) =>
                    setDate({ ...date, year: value })
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

};

const ControlledDateInput = ({ control, name, rules, ...otherProps }) => (
  <Controller
    as={<DateInput {...otherProps} />}
    onChange={([value]) => value}
    name={name}
    rules={{
      ...rules,
      validate: {
        ...rules?.validate,
        valid: (value) =>
          value && (isValid(new Date(value)) || 'Must be a is valid Date'),
      },
    }}
    control={control}
    defaultValue={control.defaultValuesRef.current[name] || null}
  />
);

ControlledDateInput.propTypes = {
  label: PropTypes.string,
  labelSize: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  rules: PropTypes.shape({}),
  control: PropTypes.object.isRequired,
};

export default ControlledDateInput;
