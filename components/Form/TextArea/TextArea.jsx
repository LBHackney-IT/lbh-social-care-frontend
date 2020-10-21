import PropTypes from 'prop-types';
import cx from 'classnames';

const TextArea = ({ label, hint, name, error, register, ...otherProps }) => (
  <div
    className={cx('govuk-form-group', {
      'govuk-form-group--error': Boolean(error)
    })}
  >
    {label && (
      <label className="govuk-label govuk-label--l" for={name}>
        {label}
      </label>
    )}
    {hint && (
      <span id={`${name}-hint`} className="govuk-hint">
        {hint}
      </span>
    )}
    {error && (
      <span id={`${name}-error`} className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {error.message}
      </span>
    )}
    <textarea
      className={cx('govuk-textarea', {
        'govuk-textarea--error': Boolean(error)
      })}
      id={name}
      name={name}
      rows="5"
      aria-describedby={`${name}-hint ${name}-error`}
      ref={register}
      {...otherProps}
    />
  </div>
);

TextArea.propTypes = {
  label: PropTypes.string,
  hint: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  })
};

export default TextArea;
