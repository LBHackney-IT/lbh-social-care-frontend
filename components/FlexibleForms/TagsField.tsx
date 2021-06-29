import {
  Field as RawField,
  FieldArray,
  useFormikContext,
  getIn,
  ErrorMessage,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from 'formik';
import s from './Repeater.module.scss';
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
  itemName?: string;
}

const RepeaterField = ({
  touched,
  errors,
  name,
  label,
  hint,
  className,
  itemName,
  required,
}: FieldProps): React.ReactElement => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();

  return (
    <div
      className={`govuk-form-group lbh-form-group ${
        getIn(touched, name) && getIn(errors, name) && 'govuk-form-group--error'
      }`}
    >
      <div className="govuk-fieldset" aria-describedby={hint && `${name}-hint`}>
        <label
          htmlFor={name}
          data-testid={name}
          className="govuk-label lbh-label"
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

        <span id={`${name}-hint`} className="govuk-hint lbh-hint">
          Separate tags with a comma
        </span>

        <ErrorMessage name={name}>
          {(msg) => (
            <p className="govuk-error-message lbh-error-message" role="alert">
              <span className="govuk-visually-hidden">Error:</span>
              {Array.isArray(msg) ? msg[0] : msg}
            </p>
          )}
        </ErrorMessage>

        <RawField
          name={`${name}`}
          id={`${name}`}
          className={cx(`govuk-input lbh-input`, className)}
          value={values[name].join(',')}
          onChange={(e: Event) =>
            setFieldValue(name, (e.target as HTMLInputElement).value.split(','))
          }
        />
      </div>
    </div>
  );
};

export default RepeaterField;
