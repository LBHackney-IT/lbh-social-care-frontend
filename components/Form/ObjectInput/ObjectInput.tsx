import cx from 'classnames';
import { Control, ErrorOption } from 'react-hook-form';

import { ObjectInput as Props } from 'components/Form/types';
import DynamicInput from 'components/FormWizard/DynamicInput';

import styles from './ObjectInput.module.scss';

export interface DynamicComponent extends Props {
  currentData: Record<string, unknown>;
  control: Control;
  errors: ErrorOption;
}

const ObjectInput = ({
  label,
  hint,
  name,
  labelSize = 'm',
  isInline,
  // this props is used for UI purpose in the summary
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  summaryInline,
  components,
  ...otherProps
}: DynamicComponent): React.ReactElement => (
  <div className="govuk-form-group govuk-!-margin-bottom-0">
    <label className={`lbh-label govuk-label--${labelSize}`}>{label}</label>
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

export default ObjectInput;
