import cx from 'classnames';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import type { Checkbox as Props, Option } from 'components/Form/types';

interface Tickbox extends Props {
  value?: string | number;
}

const Tickbox = ({
  error,
  rules,
  register,
  required,
  name,
  label,
  value,
}: Tickbox): React.ReactElement => {
  const id = value ? `${name}-${value}` : name;
  return (
    <div className="govuk-checkboxes__item">
      <input
        className={cx('lbh-checkboxes govuk-checkboxes__input', {
          'govuk-input--error': error,
        })}
        id={id}
        name={name}
        type="checkbox"
        value={value}
        ref={rules ? register?.(rules) : register}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={id}>
        {label} {required && <span className="govuk-required">*</span>}
      </label>
    </div>
  );
};

const CheckBoxWrapper = ({
  children,
  isFieldset,
  ariaDescribedby,
}: {
  children: React.ReactElement;
  isFieldset: boolean;
  ariaDescribedby?: string;
}): React.ReactElement =>
  isFieldset ? (
    <fieldset className="govuk-fieldset" aria-describedby={ariaDescribedby}>
      {children}
    </fieldset>
  ) : (
    children
  );

const Checkbox = ({
  label,
  options,
  name,
  hint,
  error,
  required,
  labelSize = 'm',
  ...otherProps
}: Props): React.ReactElement => {
  return (
    <div
      className={cx('lbh-form-group govuk-form-group', {
        'govuk-form-group--error': error,
      })}
    >
      <CheckBoxWrapper
        isFieldset={Boolean(options)}
        ariaDescribedby={hint && `${name}-hint`}
      >
        <>
          {options && (
            <legend
              className={`govuk-fieldset__legend govuk-fieldset__legend--${labelSize}`}
            >
              {label} {required && <span className="govuk-required">*</span>}
            </legend>
          )}
          {hint && (
            <div id={`${name}-hint`} className="govuk-hint">
              {hint}
            </div>
          )}
          <div className="govuk-checkboxes lbh-checkboxes">
            {options ? (
              options.map((option: Option) => {
                const { value, text } =
                  typeof option === 'string'
                    ? { value: option, text: option }
                    : option;
                return (
                  <Tickbox
                    key={value}
                    {...otherProps}
                    name={name}
                    value={value}
                    label={text}
                  />
                );
              })
            ) : (
              <Tickbox
                {...otherProps}
                name={name}
                label={label}
                required={required}
              />
            )}
          </div>
          {error && (
            <ErrorMessage
              label={error.message}
              className="govuk-!-margin-top-3"
            />
          )}
        </>
      </CheckBoxWrapper>
    </div>
  );
};

export default Checkbox;
