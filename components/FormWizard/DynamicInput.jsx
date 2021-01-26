import PropTypes from 'prop-types';

import * as Inputs from 'components/Form';

const DynamicInput = (props) => {
  const {
    component,
    register,
    control,
    errors,
    id,
    name,
    multiStepIndex,
    options,
    currentData,
    ...otherProps
  } = props;
  const inputName =
    typeof multiStepIndex === 'number'
      ? `${id}[${multiStepIndex}].${name}`
      : name;
  const Component = Inputs[component];
  const sharedProps = {
    name: inputName,
    error: errors[inputName],
    required: otherProps?.rules?.required,
    options: typeof options === 'function' ? options(currentData) : options,
    ...otherProps,
  };
  switch (component) {
    case 'ObjectInput':
      return <Component {...props} />;
    case 'AddressLookup':
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
  currentData: PropTypes.object.isRequired,
  rules: PropTypes.shape({
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }),
  multiStepIndex: PropTypes.number,
};

export default DynamicInput;
