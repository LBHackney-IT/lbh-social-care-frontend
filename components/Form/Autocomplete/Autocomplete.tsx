import { forwardRef, useEffect, useRef, useMemo } from 'react';
import Downshift from 'downshift';
import cx from 'classnames';
import { Controller, Control } from 'react-hook-form';

import { sortObject } from 'utils/objects';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import style from './Autocomplete.module.scss';

import {
  Autocomplete as IAutocomplete,
  ObjectOption,
  Option,
} from 'components/Form/types';
interface AutoProps extends Omit<IAutocomplete, 'control'> {
  value?: string | number | null;
  text?: string;
  inputClassName?: string;
  onChange: (arg0: string | number | null) => string | number | null | void;
}
interface Props extends IAutocomplete {
  control: Control;
}

const convertToObject = (options: Option[]) => {
  const objects = options?.map((option) => {
    if (typeof option === 'string') {
      return { value: option, text: option };
    }
    return option;
  });
  return sortObject(objects);
};

const findValue = (items: ObjectOption[], value: string) =>
  items.find((item) => String(item.value) === value);

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
    const items = useMemo(() => convertToObject(options), [options]);
    const autoRef = useRef<any>(null);
    const getTextValue = () => {
      if (value) {
        const selection = findValue(items, String(value));
        return selection?.text;
      }
      return '';
    };
    useEffect(() => {
      if (value === null) {
        autoRef.current?.clearSelection();
      }
    }, [value]);
    useEffect(() => {
      value &&
        !findValue(items, String(value)) &&
        autoRef.current?.clearSelection();
      // we only need to check {items}
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);
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
          getToggleButtonProps,
          clearSelection,
        }) => {
          const inputProps = getInputProps();
          return (
            <div
              className={cx(`lbh-form-group govuk-form-group`, {
                [`govuk-grid-column-${govGrid}`]: govGrid,
                'govuk-form-group--error': error,
              })}
            >
              <label
                className={`govuk-label lbh-label`}
                id={inputProps['aria-labelledby']}
              >
                {label} {required && <span className="lbh-required">*</span>}
              </label>
              <div className={style.inputContainer}>
                {hint && (
                  <span id={`${name}-hint`} className="govuk-hint lbh-hint">
                    {hint}
                  </span>
                )}
                {error && <ErrorMessage label={error.message} />}
                <input
                  {...inputProps}
                  id={name}
                  placeholder={placeholder || 'Select or search for name'}
                  data-testid={name}
                  onClick={(): void => {
                    toggleMenu();
                  }}
                  aria-describedby={hint && `${name}-hint`}
                  className={cx(`lbh-input govuk-input`, inputClassName, {
                    [`govuk-input--width-${width} `]: width,
                  })}
                  ref={ref}
                  {...otherProps}
                />
                <button
                  {...getToggleButtonProps()}
                  aria-label="toggle menu"
                  className={style.button}
                >
                  <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
                    <path
                      d="M2 1.5L8.5 7.5L15 1.5"
                      stroke="#0B0C0C"
                      strokeWidth="3"
                    />
                  </svg>
                </button>

                <ul
                  {...getMenuProps()}
                  className={style.list}
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
                          className={style.option}
                          {...getItemProps({
                            key: `${item}-${index}`,
                            index,
                            item,
                            style: {
                              color:
                                highlightedIndex === index ? '#fff' : '#000',
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
function getToggleButtonProps(): JSX.IntrinsicAttributes &
  import('react').ClassAttributes<HTMLButtonElement> &
  import('react').ButtonHTMLAttributes<HTMLButtonElement> {
  throw new Error('Function not implemented.');
}
