import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button } from 'components/Form';
import DynamicInput from 'components/DynamicInput/DynamicInput';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';

const DynamicStep = ({
  components,
  formData,
  onStepSubmit,
  formState: { isSubmitting, hasError },
}) => {
  const { handleSubmit, register, control, errors } = useForm({
    defaultValues: formData,
  });
  return (
    <>
      <form onSubmit={handleSubmit(onStepSubmit)}>
        <div className="govuk-form-group">
          {components?.map((componentProps) =>
            componentProps.name ? (
              <DynamicInput
                key={componentProps.name}
                register={register}
                control={control}
                errors={errors}
                {...componentProps}
              />
            ) : (
              componentProps
            )
          )}
        </div>
        <Button
          className="govuk-button"
          label="Next"
          type="submit"
          disabled={isSubmitting}
        />
      </form>
      {hasError && (
        <ErrorSummary
          title="Unfortunately there was a problem with your submission."
          body="Please try again."
        />
      )}
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
