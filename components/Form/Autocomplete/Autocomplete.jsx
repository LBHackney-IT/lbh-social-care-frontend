import Downshift from 'downshift';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Controller } from 'react-hook-form';

import { sortObject } from 'utils/objects';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import ClearIcon from 'components/Icons/Clear';
import style from './Autocomplete.module.scss';

const AutocompleteComponents = ({
  label,
  hint,
  name,
  error,
  labelSize = 'm',
  required,
  onChange,
  placeholder,
  width = 20,
  govGrid,
  inputClassName,
  options,
}) => {
  const optionObject = options.map((option) => {
    if (typeof option === 'string') {
      return { value: option, text: option };
    }
    return option;
  });

  const items = sortObject(optionObject);
  return (
    <Downshift
      onChange={(selection) => onChange(selection ? selection.value : '')}
      itemToString={(item) => (item ? item.text : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        getRootProps,
        toggleMenu,
        highlightedIndex,
        selectedItem,
        clearSelection,
      }) => (
        <div
          className={cx(`govuk-form-group govuk-grid-column-${govGrid}`, {
            'govuk-form-group--error': error,
          })}
        >
          <label
            className={`govuk-label govuk-label--${labelSize}`}
            htmlFor={name}
          >
            {label} {required && <span className="govuk-required">*</span>}
          </label>

          <div
            className={style.inputContainer}
            {...getRootProps({}, { suppressRefError: true })}
          >
            {hint && (
              <span id={`${name}-hint`} className="govuk-hint">
                {hint}
              </span>
            )}
            {error && <ErrorMessage label={error.message} />}
            <input
              {...getInputProps()}
              placeholder={placeholder || 'Select or search for a value'}
              id={name}
              data-testid={name}
              name={`${name}.autocomplete`}
              onClick={toggleMenu}
              aria-describedby={hint && `${name}-hint`}
              className={cx(`govuk-input`, inputClassName, {
                [`govuk-input--width-${width}`]: width,
              })}
              style={
                error ? { borderColor: '#d4351c' } : { borderColor: '#000' }
              }
            />
            {inputValue && (
              <span onClick={clearSelection} className={style.clear}>
                <ClearIcon />
              </span>
            )}
          </div>
          <ul
            {...getMenuProps()}
            className={style.suggestionList}
            style={
              isOpen
                ? { borderBottom: '1px solid #aaa' }
                : { borderBottom: 'none' }
            }
          >
            {isOpen &&
              items
                .filter(
                  (item) =>
                    !inputValue ||
                    item.text.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item, index) => (
                  <li
                    key={index}
                    data-testid={`${name}_${index}`}
                    className={style.suggestion}
                    {...getItemProps({
                      key: index,
                      index,
                      item,
                      style: {
                        color: highlightedIndex === index ? '#fff' : '#000',
                        backgroundColor:
                          highlightedIndex === index ? '#8b8b8b' : '#fff',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.text}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

AutocompleteComponents.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelSize: PropTypes.string,
  hint: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  rules: PropTypes.shape({}),
  width: PropTypes.number,
  inputClassName: PropTypes.string,
  govGrid: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

const Autocomplete = ({ name, control, ...otherProps }) => (
  <Controller
    render={({ onChange, value, name }) => (
      <AutocompleteComponents
        name={name}
        value={value}
        onChange={(value) => onChange(value)}
        {...otherProps}
      />
    )}
    control={control}
    name={name}
    defaultValue={control?.defaultValuesRef?.current[name] || ''}
  />
);

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default Autocomplete;
