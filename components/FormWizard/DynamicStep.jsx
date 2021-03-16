import { isValidElement, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import Button from 'components/Button/Button';
import DynamicInput from 'components/FormWizard/DynamicInput';
import DynamicInputMulti from 'components/FormWizard/DynamicInputMulti';

import styles from './DynamicStep.module.scss';

const DynamicStep = ({
  isMulti,
  stepId,
  components,
  formData,
  onStepSubmit,
  onSaveAndExit,
}) => {
  const { handleSubmit, register, control, errors, setValue, watch } = useForm({
    defaultValues: formData,
  });
  const stepValues = watch();
  const currentData = {
    ...formData,
    ...stepValues,
  };
  const multiStepPrefix =
    isMulti && `${stepId[0]}[${parseInt(stepId[1]) - 1 || 0}]`;
  const sanitiseData = useCallback(
    (data) => ({
      ...components
        .filter(({ isMulti }) => isMulti)
        .reduce((acc, { name }) => ({ ...acc, [name]: undefined }), {}),
      ...data,
    }),
    [components]
  );
  if (!register) {
    return null;
  }
  return (
    <>
      <form onSubmit={handleSubmit((data) => onStepSubmit(sanitiseData(data)))}>
        <div className="govuk-form-group">
          {components?.map(
            ({
              conditionalRender,
              showConditionalGuides,
              name,
              isMulti: isComponentMulti,
              ...componentProps
            }) => {
              if (isValidElement(componentProps)) {
                return componentProps;
              }
              if (conditionalRender && !conditionalRender(currentData)) {
                return null;
              }
              const inputName = multiStepPrefix
                ? `${multiStepPrefix}.${name}`
                : name;
              const sharedProps = {
                key: inputName,
                name: inputName,
                register: register,
                control: control,
                errors: errors,
                currentData: currentData,
                ...componentProps,
              };
              return (
                <div
                  key={inputName}
                  className={cx('govuk-form-group', {
                    [styles.withConditionalGuides]:
                      conditionalRender && showConditionalGuides,
                  })}
                >
                  {isComponentMulti ? (
                    <DynamicInputMulti
                      {...sharedProps}
                      initialInputData={formData[name]}
                      onDelete={(updatedValue) =>
                        setValue(inputName, updatedValue)
                      }
                    />
                  ) : (
                    <DynamicInput {...sharedProps} />
                  )}
                </div>
              );
            }
          )}
        </div>
        {isMulti && (
          <Button
            isSecondary
            label="Add Another"
            type="button"
            onClick={() =>
              handleSubmit((data) => onStepSubmit(sanitiseData(data), true))()
            }
          />
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button
              isSecondary
              wideButton
              label="Save and finish later"
              type="button"
              onClick={() => onSaveAndExit(stepValues)}
            />
            <a
              href="/"
              className="govuk-link"
              style={{
                marginLeft: '1.5rem',
                lineHeight: '2.5rem',
              }}
            >
              Cancel
            </a>
          </div>
          <Button
            wideButton
            className="govuk-!-margin-left-1"
            label="Continue"
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

DynamicStep.propTypes = {
  stepId: PropTypes.array,
  components: PropTypes.array,
  onStepSubmit: PropTypes.func.isRequired,
  onSaveAndExit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  isMulti: PropTypes.bool,
};

export default DynamicStep;
