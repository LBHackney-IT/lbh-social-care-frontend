import cx from 'classnames';
import PropTypes from 'prop-types';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const Checkbox = ({ label, name, register, error }) => (
  <div
    className={cx('govuk-form-group', {
      'govuk-form-group--error': error
    })}
  >
    <div className="govuk-checkboxes">
      <div className="govuk-checkboxes__item">
        <input
          className="govuk-checkboxes__input"
          className={cx('govuk-checkboxes__input', {
            'govuk-input--error': error
          })}
          id={name}
          name={name}
          type="checkbox"
          ref={register}
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor={name}>
          {label}
        </label>
      </div>
    </div>
    {error && (
      <ErrorMessage text={error.message} className="govuk-!-margin-top-3" />
    )}
  </div>
);

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.shape({ message: PropTypes.string.isRequired })
};

export default Checkbox;
