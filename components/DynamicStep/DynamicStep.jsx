import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button } from 'components/Form';
import DynamicInput from 'components/DynamicInput/DynamicInput';

const DynamicStep = ({ components, formData, onStepSubmit }) => {
  const { handleSubmit, register, control, errors } = useForm({
    defaultValues: formData,
  });

  return (
    <form onSubmit={handleSubmit(onStepSubmit)}>
      <div className="govuk-form-group">
        {components?.map((componentProps) => (
          <DynamicInput
            key={componentProps.name}
            register={register}
            control={control}
            errors={errors}
            {...componentProps}
          />
        ))}
      </div>
      <Button className="govuk-button" label="Next" type="submit" />
    </form>
  );
};

DynamicStep.propTypes = {
  components: PropTypes.array.isRequired,
  onStepSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default DynamicStep;
