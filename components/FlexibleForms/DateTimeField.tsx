import {
  Field as RawField,
  ErrorMessage,
  getIn,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from 'formik';
import s from './DateTimeField.module.scss';

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
  label,
  hint,
  required,
}: FieldProps): React.ReactElement => (
  <div
    className={`govuk-form-group lbh-form-group ${
      getIn(touched, name) && getIn(errors, name) && 'govuk-form-group--error'
    }`}
  >
    <label htmlFor={name} data-testid={name} className="govuk-label lbh-label">
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
          {msg[0] || msg[1]}
        </p>
      )}
    </ErrorMessage>

    <RawField
      name={`${name}.0`}
      id={name}
      className={`govuk-input lbh-input ${s.date}`}
      aria-describedby={hint && `${name}-hint`}
      type="date"
    />
    <RawField
      name={`${name}.1`}
      id={name}
      className={'govuk-input lbh-input govuk-input--width-5'}
      aria-describedby={hint && `${name}-hint`}
      type="time"
    />
  </div>
);

export default Field;
