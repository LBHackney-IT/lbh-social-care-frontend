import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button } from 'components/Form';
import DynamicInput from 'components/DynamicStep/DynamicInput';

const DynamicStep = ({ components, formData, onStepSubmit, onSaveAndExit }) => {
  const { handleSubmit, register, control, errors, watch } = useForm({
    defaultValues: formData,
  });

  return (
    <>
      <form>
        <div className="govuk-form-group">
          {components?.map((componentProps) =>
            componentProps.name ? (
              <DynamicInput
                key={componentProps.name}
                register={register}
                control={control}
                errors={errors}
                watch={watch}
                {...componentProps}
              />
            ) : (
              componentProps
            )
          )}
        </div>
        <div className="govuk-form-group">
          <Button
            className="govuk-!-margin-right-1"
            label="Next"
            type="submit"
            onClick={handleSubmit(onStepSubmit)}
          />
          <Button
            isSecondary
            label="Save and Exit"
            type="click"
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
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
};

export default DynamicStep;
