import { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import { Controller } from 'react-hook-form';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const getInitialDate = (value = '') => {
  const [year = '', month = '', day = ''] = value.split('-');
  return { day, month, year };
};

const DateInput = ({ label, inputRef, error, value, onChange }) => {
  const [date, setDate] = useState(getInitialDate(value));
  useEffect(() => {
    const { day, month, year } = date;
    day !== '' &&
      month !== '' &&
      year !== '' &&
      onChange(`${year}-${month}-${day}`);
  }, [date]);
  return (
    <div
      className={cx('govuk-form-group', {
        'govuk-form-group--error': error
      })}
    >
      <fieldset
        className="govuk-fieldset"
        role="group"
        aria-describedby={`${name}-hint`}
      >
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h1 className="govuk-fieldset__heading">{label}</h1>
        </legend>
        {error && <ErrorMessage text={error.message} />}
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
                    'govuk-input--error': error
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
                ref={inputRef}
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
                    'govuk-input--error': error
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
                    'govuk-input--error': error
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
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

const ControlledDateInput = ({ control, name, rules, ...otherProps }) => {
  const inputRef = useRef();
  return (
    <Controller
      as={<DateInput inputRef={inputRef} {...otherProps} />}
      onChange={([value]) => value}
      name={name}
      rules={rules}
      onFocus={() => inputRef.current.focus()}
      control={control}
    ></Controller>
  );
};

export default ControlledDateInput;
