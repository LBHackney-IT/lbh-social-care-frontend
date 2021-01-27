import PropTypes from 'prop-types';
import cx from 'classnames';

import DynamicInput from 'components/FormWizard/DynamicInput';

import styles from './ObjectInput.module.scss';

const ObjectInput = ({
  label,
  hint,
  name,
  labelSize = 'm',
  isInline,
  components,
  ...otherProps
}) => (
  <div className="govuk-form-group govuk-!-margin-bottom-0">
    <label className={`govuk-label govuk-label--${labelSize}`}>{label}</label>
    {hint && (
      <span id={`${name}-hint`} className="govuk-hint">
        {hint}
      </span>
    )}
    <div className={cx({ [styles.inlineInputs]: isInline })}>
      {components.map((subComponent) => (
        <DynamicInput
          key={subComponent.name}
          {...otherProps}
          {...subComponent}
          labelSize="s"
          name={`${name}.${subComponent.name}`}
        />
      ))}
    </div>
  </div>
);

ObjectInput.propTypes = {
  label: PropTypes.string,
  labelSize: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  isInline: PropTypes.bool,
  hint: PropTypes.string,
  name: PropTypes.string.isRequired,
  components: PropTypes.array.isRequired,
};

export default ObjectInput;
