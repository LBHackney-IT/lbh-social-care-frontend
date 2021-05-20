import { Field as RawField, ErrorMessage, getIn } from 'formik';

interface FieldProps {
  touched;
  errors;
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
}: FieldProps): React.ReactElement => (
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
        className={`govuk-radios lbh-radios govuk-!-margin-top-3 ${className}`}
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

export default Field;
