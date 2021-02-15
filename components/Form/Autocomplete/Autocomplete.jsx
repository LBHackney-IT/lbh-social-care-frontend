import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import DeleteIcon from 'components/Icons/TimesCircle';

import { Controller } from 'react-hook-form';
import style from './Autocomplete.module.scss';

const AutocompleteComponents = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
  hint,
  register,
  rules,
  error,
  labelSize = 'm',
  required,
  ...otherProps
}) => {
  const data = options.map((option) => {
    return typeof option === 'string'
      ? { value: option, text: option }
      : option;
  });
  const [selected, setSelected] = useState(value || '');
  const [suggestions, setSuggestions] = useState(data);
  const [suggestionView, setSuggestionView] = useState(false);
  const [displayView, setDisplayValue] = useState('');
  const [clearBtn, setClearBtn] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', viewHandler);
    return () => {
      document.removeEventListener('mousedown', viewHandler);
    };
  }, []);

  const getSuggestion = (value) => {
    setDisplayValue(value);
    setClearBtn(true);
    setSuggestions(
      data.filter((option) =>
        option.text.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const viewHandler = (e) => {
    if (e.target.parentElement.id === name || e.target.name === name) {
      setSuggestionView(true);
      return;
    }
    setSuggestionView(false);
  };

  const clearValue = () => {
    setDisplayValue('');
    setSuggestions(data);
    setClearBtn(false);
  };
  const handleSelected = useCallback((e) => {
    setSelected(e.target.value);
    setClearBtn(true);
    onChange(e.target.value);
    setDisplayValue(e.target.innerText);
    setSuggestionView(false);
  });
  return (
    <div className="govuk-!-margin-top-5">
      <div className={style.inputContainer}>
        <div
          className={cx('govuk-form-group', {
            'govuk-form-group--error': error,
          })}
        >
          <label
            className={`govuk-label govuk-label--${labelSize}`}
            htmlFor={name}
          >
            {label} {required && <span className="govuk-required">*</span>}
          </label>
          {hint && (
            <span id={`${name}-hint`} className="govuk-hint">
              {hint}
            </span>
          )}
          {error && <ErrorMessage label={error.message} />}
          <div className={style.inputContainer}>
            <input
              className={style.input}
              id={name}
              placeholder={placeholder || 'Search or select a value'}
              data-testid={name}
              name={name}
              value={displayView}
              defaultValue={selected}
              autoComplete="off"
              ref={rules ? register?.(rules) : register}
              aria-describedby={hint && `${name}-hint`}
              onClick={(e) => viewHandler(e)}
              onChange={(e) => getSuggestion(e.target.value)}
              {...otherProps}
            />
            {clearBtn && (
              <span onClick={clearValue} className={style.clear}>
                <DeleteIcon />
              </span>
            )}
          </div>
        </div>
      </div>
      {suggestionView && (
        <ul className={style.suggestionList} id={name}>
          {suggestions.map((item) => (
            <li
              className={style.suggestion}
              key={item.value}
              data-testid={`${name}_${item.text}`}
              name={`${name}_${item.text}`}
              value={item.value}
              onClick={(e) => handleSelected(e)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

AutocompleteComponents.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelSize: PropTypes.string,
  hint: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  register: PropTypes.func,
  rules: PropTypes.shape({}),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

const Autocomplete = ({
  name,
  label,
  hint,
  control,
  required,
  rules,
  options,
  placeholder,
  ...otherProps
}) => (
  <div className="govuk-form-group">
    <Controller
      render={({ onChange, value, name }) => (
        <AutocompleteComponents
          name={name}
          hint={hint}
          value={value}
          label={label}
          required={required}
          rules={rules}
          options={options}
          placeholder={placeholder}
          onChange={(value) => onChange(value)}
          {...otherProps}
        />
      )}
      control={control}
      name={name}
      defaultValue={control?.defaultValuesRef?.current[name] || null}
    />
  </div>
);

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  rules: PropTypes.shape({}),
  required: PropTypes.bool,
  control: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array,
};

export default Autocomplete;
