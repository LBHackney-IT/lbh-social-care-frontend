import { useState, useEffect } from 'react';
import {
  useFormikContext,
  getIn,
  ErrorMessage,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from 'formik';
import { useMultipleSelection, useCombobox } from 'downshift';
import s from './ComboboxField.module.scss';
import cx from 'classnames';
import caseNoteTags from 'data/caseNoteTags';

interface FieldProps {
  touched: FormikTouched<FormikValues>;
  errors: FormikErrors<FormikValues>;
  name: string;
  label: string;
  type?: string;
  hint?: string;
  className?: string;
  required?: boolean;
}

const Field = ({
  touched,
  errors,
  name,
  label,
  hint,
  className,
  required,
}: FieldProps): React.ReactElement => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const [inputValue, setInputValue] = useState<string>('');

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems: values[name] });

  useEffect(() => {
    setFieldValue(name, selectedItems);
    // setInputValue('');
  }, [selectedItems, name, setFieldValue]);

  const items = caseNoteTags.filter((tag) => !values[name].includes(tag));

  const getFilteredItems = (items: string[]) =>
    items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 &&
        item.toLowerCase().startsWith(inputValue.toLowerCase())
    );

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
  } = useCombobox({
    inputValue,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    items: getFilteredItems(items),
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue as string);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          console.log(inputValue, type, selectedItem);
          addSelectedItem(inputValue);
          break;
        default:
          break;
      }
    },
  });

  return (
    <div
      className={`govuk-form-group lbh-form-group ${
        getIn(touched, name) && getIn(errors, name) && 'govuk-form-group--error'
      }`}
    >
      <label
        data-testid={name}
        className="govuk-label lbh-label"
        {...getLabelProps()}
      >
        {label}
        {required && (
          <span className="govuk-required">
            <span aria-hidden="true">*</span>
            <span className="govuk-visually-hidden">required</span>
          </span>
        )}
      </label>

      {hint && (
        <span id={`${name}-hint`} className="govuk-hint lbh-hint">
          {hint}
        </span>
      )}

      <ErrorMessage name={name}>
        {(msg) => (
          <p className="govuk-error-message lbh-error-message" role="alert">
            <span className="govuk-visually-hidden">Error:</span>
            {msg}
          </p>
        )}
      </ErrorMessage>

      {JSON.stringify(selectedItems)}

      <ul
        className="lbh-list lbh-body-s govuk-!-margin-bottom-4"
        aria-live="polite"
        aria-relevant="additions"
      >
        {selectedItems.map((selectedItem, index) => (
          <li
            key={`selected-item-${index}`}
            {...getSelectedItemProps({ selectedItem, index })}
          >
            {selectedItem}{' '}
            <button
              className="lbh-link"
              onClick={(e) => {
                e.stopPropagation();
                removeSelectedItem(selectedItem);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div {...getComboboxProps()} className={s.combobox}>
        <input
          className={cx(`govuk-input lbh-input`, s.input, className)}
          aria-describedby={hint ? `${name}-hint` : undefined}
          {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
        />
        <button
          {...getToggleButtonProps()}
          aria-label="toggle menu"
          className={s.button}
        >
          <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
            <path d="M2 1.5L8.5 7.5L15 1.5" stroke="#0B0C0C" strokeWidth="3" />
          </svg>
        </button>

        <ul {...getMenuProps()} className={s.list}>
          {isOpen &&
            getFilteredItems(items).map((item, index) => (
              <li
                className={`${s.option} govuk-!-margin-top-1`}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Field;
