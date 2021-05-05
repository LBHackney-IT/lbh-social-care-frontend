import { forwardRef, useEffect, useRef, useMemo } from 'react';
import Downshift from 'downshift';
import cx from 'classnames';
import { Controller, Control } from 'react-hook-form';

import { sortObject } from 'utils/objects';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import ClearIcon from 'components/Icons/Clear';
import DownArrow from 'components/Icons/DownArrow';
import style from './Autocomplete.module.scss';

import { Autocomplete as IAutocomplete, Option } from 'components/Form/types';
interface AutoProps extends Omit<IAutocomplete, 'control'> {
  value?: string | number | null;
  text?: string;
  inputClassName?: string;
  onChange: (arg0: string | number | null) => string | number | null | void;
}
interface Props extends IAutocomplete {
  control: Control;
}

// eslint-disable-next-line react/display-name
export const Autocomplete = forwardRef<HTMLInputElement, AutoProps>(
  (
    {
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
      value,
      inputClassName,
      options,
      ...otherProps
    }: AutoProps,
    ref
  ) => {
    const convertToObject = (options: Option[]) => {
      const objects = options?.map((option) => {
        if (typeof option === 'string') {
          return { value: option, text: option };
        }
        return option;
      });
      return sortObject(objects);
    };

    const items = useMemo(() => convertToObject(options), [options]);
    const autoRef = useRef<any>(null);
    const getTextValue = () => {
      if (value) {
        const selection = items.find(
          (item) => String(item.value) === String(value)
        );
        return selection?.text;
      }
      return '';
    };
    useEffect(() => {
      if (value === null) {
        autoRef.current?.clearSelection();
      }
    }, [value]);

    return (
      <Downshift
        initialInputValue={getTextValue()}
        onChange={(selection) =>
          onChange && onChange(selection ? selection.value : '')
        }
        itemToString={(item) => (item ? item.text : '')}
        ref={autoRef}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          toggleMenu,
          highlightedIndex,
          clearSelection,
        }) => {
          return (
            <div
              className={cx(`govuk-form-group govuk-grid-column-${govGrid}`, {
                'govuk-form-group--error': error,
              })}
            >
              <label
                id={`govuk-label govuk-label--${labelSize}`}
                className={`govuk-label govuk-label--${labelSize}`}
                htmlFor={name}
              >
                {label} {required && <span className="govuk-required">*</span>}
              </label>
              <div className={style.inputContainer}>
                {hint && (
                  <span id={`${name}-hint`} className="govuk-hint">
                    {hint}
                  </span>
                )}
                {error && <ErrorMessage label={error.message} />}
                <input
                  {...getInputProps()}
                  id={name}
                  placeholder={placeholder || 'Select or search for name'}
                  data-testid={name}
                  onClick={(): void => {
                    toggleMenu();
                  }}
                  aria-describedby={hint && `${name}-hint`}
                  aria-labelledby={name}
                  className={cx(`govuk-input`, inputClassName, {
                    [`govuk-input--width-${width}`]: width,
                  })}
                  ref={ref}
                  {...otherProps}
                />
                {!isOpen && !inputValue && (
                  <span
                    onClick={(): void => {
                      toggleMenu();
                    }}
                    className={style.toggle}
                    role="button"
                  >
                    <DownArrow />
                  </span>
                )}
                {inputValue && (
                  <span
                    onClick={(): void => {
                      clearSelection();
                    }}
                    className={style.clear}
                    role="button"
                  >
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
                        item.text
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        key={index}
                        data-testid={`${name}_${index}`}
                        className={style.suggestion}
                        {...getItemProps({
                          key: `${item}-${index}`,
                          index,
                          item,
                          style: {
                            color: highlightedIndex === index ? '#fff' : '#000',
                            backgroundColor:
                              highlightedIndex === index ? '#8b8b8b' : '#fff',
                          },
                        })}
                      >
                        {item.text}
                      </li>
                    ))}
              </ul>
            </div>
          );
        }}
      </Downshift>
    );
  }
);

const ControlledAutocomplete = ({
  name,
  control,
  rules,
  ...otherProps
}: Props): React.ReactElement => (
  <Controller
    render={({ onChange, value }) => (
      <Autocomplete
        name={name}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    )}
    name={name}
    rules={{
      ...rules,
      validate: {
        ...(typeof rules?.validate === 'function'
          ? { validation: rules.validate }
          : rules?.validate),
      },
    }}
    control={control}
    defaultValue={control.defaultValuesRef.current[name] || ''}
  />
);

export default ControlledAutocomplete;
