import { isValidElement } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Button from 'components/Button/Button';
import DynamicInput from 'components/FormWizard/DynamicInput';
import DynamicInputMulti from 'components/FormWizard/DynamicInputMulti';

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
  return (
    <>
      <form onSubmit={handleSubmit((data) => onStepSubmit(data))}>
        <div className="govuk-form-group">
          {components?.map(
            ({
              conditionalRender,
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
              return isComponentMulti ? (
                <DynamicInputMulti
                  {...sharedProps}
                  initialInputData={formData[name]}
                  onDelete={(updatedValue) => setValue(inputName, updatedValue)}
                />
              ) : (
                <DynamicInput {...sharedProps} />
              );
            }
          )}
        </div>
        {isMulti && (
          <Button
            isSecondary
            label="Add Another"
            type="button"
            onClick={() => handleSubmit((data) => onStepSubmit(data, true))()}
          />
        )}
        <div className="govuk-form-group">
          <Button
            className="govuk-!-margin-right-1"
            label="Next"
            type="submit"
          />
          <Button
            isSecondary
            label="Save and Exit"
            type="button"
            onClick={() => onSaveAndExit(stepValues)}
          />
        </div>
      </form>
    </>
  );
};

DynamicStep.propTypes = {
  components: PropTypes.array,
  onStepSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  isMulti: PropTypes.bool,
};

export default DynamicStep;
