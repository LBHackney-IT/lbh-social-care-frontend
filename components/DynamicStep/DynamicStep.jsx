import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button } from 'components/Form';
import DynamicInput from 'components/DynamicInput/DynamicInput';

const DynamicStep = ({
  isMulti,
  stepId,
  components,
  formData,
  onStepSubmit,
}) => {
  const { handleSubmit, register, control, errors } = useForm({
    defaultValues: formData,
  });
  return (
    <>
      <form onSubmit={handleSubmit((data) => onStepSubmit(data))}>
        <div className="govuk-form-group">
          {components?.map((componentProps) =>
            componentProps.name ? (
              <DynamicInput
                key={componentProps.name}
                register={register}
                control={control}
                errors={errors}
                multiStepIndex={isMulti && (parseInt(stepId[1]) || 0)}
                {...componentProps}
              />
            ) : (
              componentProps
            )
          )}
        </div>
        {isMulti && (
          <Button
            className="govuk-button govuk-button--secondary"
            label="Add Another"
            type="click"
            onClick={() => handleSubmit((data) => onStepSubmit(data, true))()}
          />
        )}
        <Button className="govuk-button" label="Next" type="submit" />
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
