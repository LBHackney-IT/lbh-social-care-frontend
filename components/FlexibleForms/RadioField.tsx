import {
  Field as RawField,
  ErrorMessage,
  getIn,
  FormikErrors,
  FormikTouched,
  FormikValues,
  useFormikContext,
} from 'formik';
import cx from 'classnames';

interface FieldProps {
  touched: FormikTouched<FormikValues>;
  errors: FormikErrors<FormikValues>;
  name: string;
  label: string;
  type?: string;
  hint?: string;
  className?: string;
  required?: boolean;
  choices: {
    value: string;
    label: string;
  }[];
  condition?: {
    id: string;
    value: string | boolean;
  };
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Field = ({
  touched,
  errors,
  name,
  label,
  hint,
  className,
  choices,
  onChange,
  required,
  condition,
}: FieldProps): React.ReactElement => {
  const { values }: { values: FormikValues } = useFormikContext();

  const validate = (val: string): string | void => {
    if (
      condition &&
      values[condition.id] === condition.value &&
      required &&
      !val
    ) {
      return 'This question is required';
    }
  };

  return (
    <div
      className={`govuk-form-group lbh-form-group ${
        getIn(touched, name) && getIn(errors, name) && 'govuk-form-group--error'
      }`}
    >
      <fieldset
        className="govuk-fieldset"
        aria-describedby={hint && `${name}-hint`}
      >
        <legend className="govuk-label lbh-label">{label}</legend>

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
          className={cx(
            `govuk-radios lbh-radios govuk-!-margin-top-3`,
            className
          )}
        >
          {choices.map((choice) => (
            <div className="govuk-radios__item" key={choice.value}>
              {onChange ? (
                <input
                  type="radio"
                  name={name}
                  value={choice.value}
                  id={`${name}-${choice.value}`}
                  className="govuk-radios__input"
                  onChange={onChange}
                />
              ) : (
                <RawField
                  type="radio"
                  name={name}
                  value={choice.value}
                  id={`${name}-${choice.value}`}
                  className="govuk-radios__input"
                  validate={validate}
                />
              )}
              <label
                className="govuk-label govuk-radios__label"
                htmlFor={`${name}-${choice.value}`}
              >
                {choice.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default Field;
