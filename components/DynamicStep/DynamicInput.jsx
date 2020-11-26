import PropTypes from 'prop-types';

import * as Inputs from 'components/Form';

const DynamicInput = ({
  component,
  register,
  control,
  id,
  name,
  errors,
  multiStepIndex,
  ...otherProps
}) => {
  const inputName =
    typeof multiStepIndex === 'number'
      ? `${id}[${multiStepIndex}].${name}`
      : name;
  const Component = Inputs[component];
  const sharedProps = {
    name: inputName,
    error: errors[inputName],
    required: otherProps?.rules?.required,
    ...otherProps,
  };
  switch (component) {
    case 'AddressLookup':
      return (
        <Component register={register} control={control} {...sharedProps} />
      );
    case 'DateInput':
      return <Component control={control} {...sharedProps} />;
    default:
      return (
        <Component register={register(otherProps.rules)} {...sharedProps} />
      );
  }
};

DynamicInput.propTypes = {
  component: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  rules: PropTypes.shape({
    required: PropTypes.bool,
  }),
  multiStepIndex: PropTypes.number,
};

export default DynamicInput;
