import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button } from 'components/Form';
import DynamicInput from 'components/DynamicStep/DynamicInput';

const DynamicStep = ({
  isMulti,
  stepId,
  components,
  formData,
  onStepSubmit,
  onSaveAndExit,
}) => {
  const { handleSubmit, register, control, errors, watch } = useForm({
    defaultValues: formData,
  });
  const stepValues = watch();
  return (
    <>
      <form onSubmit={handleSubmit((data) => onStepSubmit(data))}>
        <div className="govuk-form-group">
          {components?.map(({ conditionalRender, ...componentProps }) =>
            componentProps.name ? (
              conditionalRender &&
              !conditionalRender({
                ...formData,
                ...stepValues,
              }) ? null : (
                <DynamicInput
                  key={componentProps.name}
                  id={stepId[0]}
                  register={register}
                  control={control}
                  errors={errors}
                  multiStepIndex={isMulti && (parseInt(stepId[1]) - 1 || 0)}
                  {...componentProps}
                />
              )
            ) : (
              componentProps
            )
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
            onClick={handleSubmit(onSaveAndExit)}
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
