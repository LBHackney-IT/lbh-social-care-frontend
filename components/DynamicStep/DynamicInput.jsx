import PropTypes from 'prop-types';

import * as Inputs from 'components/Form';

const DynamicInput = ({
  component,
  register,
  control,
  name,
  errors,
  ...otherProps
}) => {
  const Component = Inputs[component];
  const sharedProps = {
    name: name,
    error: errors[name],
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
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  rules: PropTypes.shape({
    required: PropTypes.bool,
  }),
};

export default DynamicInput;
