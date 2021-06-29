import React from 'react';
import {
  useFormikContext,
  getIn,
  ErrorMessage,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from 'formik';
import Downshift from 'downshift';
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

  const items = caseNoteTags.filter((tag) => !values[name].includes(tag));

  return (
    <Downshift
      id={`${name}-tags`}
      onChange={(selection, arg2) => {
        console.log(selection, arg2);
        setFieldValue(name, [...values[name], selection]);
      }}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        inputValue,
        getRootProps,
      }) => (
        <div
          className={`govuk-form-group lbh-form-group ${
            getIn(touched, name) &&
            getIn(errors, name) &&
            'govuk-form-group--error'
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

          <div
            {...getRootProps(undefined, { suppressRefError: true })}
            className={s.combobox}
          >
            <input
              {...getInputProps()}
              className={cx(`govuk-input lbh-input`, s.input, className)}
              aria-describedby={hint ? `${name}-hint` : undefined}
            />
            <button
              {...getToggleButtonProps()}
              aria-label="toggle menu"
              className={s.button}
            >
              <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
                <path
                  d="M2 1.5L8.5 7.5L15 1.5"
                  stroke="#0B0C0C"
                  strokeWidth="3"
                />
              </svg>
            </button>

            {isOpen && (
              <ul {...getMenuProps()} className={s.list}>
                {items
                  .filter(
                    (item) =>
                      !inputValue ||
                      item.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((item, i) => (
                    <li
                      {...getItemProps({
                        key: item,
                        index: i,
                        item,
                      })}
                      key={i}
                      className={s.option}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <ul
            className="lbh-list lbh-body-s"
            aria-live="polite"
            aria-relevant="additions"
          >
            {values[name].map((value: string) => (
              <li key={value}>
                {value}{' '}
                <button
                  className="lbh-link"
                  onClick={() => {
                    setFieldValue(
                      name,
                      values[name].filter((tag: string) => tag !== value)
                    );
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default Field;
