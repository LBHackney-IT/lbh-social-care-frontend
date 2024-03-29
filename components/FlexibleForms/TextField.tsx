import {
  Field as RawField,
  ErrorMessage,
  getIn,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from 'formik';
import cx from 'classnames';
import { useRef } from 'react';

interface FieldProps {
  touched: FormikTouched<FormikValues>;
  errors: FormikErrors<FormikValues>;
  name: string;
  label: string;
  type?: string;
  hint?: string;
  className?: string;
  as?: string;
  rows?: number;
  required?: boolean;
}

const Field = ({
  touched,
  errors,
  name,
  type,
  label,
  hint,
  className,
  as,
  rows,
  required,
}: FieldProps): React.ReactElement => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textarea = textAreaRef.current;
  textarea &&
    as === 'textarea' &&
    (textarea.oninput = () => {
      textarea.style.height = '';
      textarea.style.height = textarea.scrollHeight + 'px';
    });

  return (
    <div
      className={`govuk-form-group lbh-form-group ${
        getIn(touched, name) && getIn(errors, name) && 'govuk-form-group--error'
      }`}
    >
      <label
        htmlFor={name}
        data-testid={name}
        className="govuk-label lbh-label"
      >
        {label}{' '}
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
          <p
            className="govuk-error-message lbh-error-message"
            role="alert"
            data-testid="text-field-error-message"
          >
            <span className="govuk-visually-hidden">Error:</span>
            {msg}
          </p>
        )}
      </ErrorMessage>

      <RawField
        name={name}
        id={name}
        type={type}
        innerRef={textAreaRef}
        data-testid="text-raw-field"
        className={cx(
          as === 'textarea'
            ? 'govuk-textarea lbh-textarea'
            : 'govuk-input lbh-input',
          className
        )}
        aria-describedby={hint && `${name}-hint`}
        as={as}
        rows={rows}
      />
    </div>
  );
};

export default Field;
