import cx from 'classnames';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import type { Checkbox as Props, Option } from 'components/Form/types';

interface Tickbox extends Props {
  value?: string;
}

const Tickbox = ({
  error,
  rules,
  register,
  required,
  name,
  label,
  value,
}: Tickbox): React.ReactElement => (
  <div className="govuk-checkboxes__item">
    <input
      className={cx('govuk-checkboxes__input', {
        'govuk-input--error': error,
      })}
      id={name}
      name={name}
      type="checkbox"
      value={value}
      ref={rules ? register?.(rules) : register}
    />
    <label className="govuk-label govuk-checkboxes__label" htmlFor={name}>
      {label} {required && <span className="govuk-required">*</span>}
    </label>
  </div>
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
}: Props): React.ReactElement => (
  <div
    className={cx('govuk-form-group', 'lbh-form-group', {
      'govuk-form-group--error': error,
    })}
  >
    <fieldset
      className="govuk-fieldset"
      aria-describedby={hint && `${name}-hint`}
    >
      {options && (
        <legend
          className={`govuk-fieldset__legend govuk-fieldset__legend--${labelSize}`}
        >
          {label} {required && <span className="govuk-required">*</span>}
        </legend>
      )}
      {hint && (
        <div id={`${name}-hint`} className="govuk-hint lbh-hint">
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
        <ErrorMessage label={error.message} className="govuk-!-margin-top-3" />
      )}
    </fieldset>
  </div>
);

export default Checkbox;
