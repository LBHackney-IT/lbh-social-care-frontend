import PropTypes from 'prop-types';

import * as Inputs from 'components/Form';

const DynamicInput = (props) => {
  const {
    component,
    control,
    errors,
    name,
    options,
    currentData,
    ...otherProps
  } = props;
  const Component = Inputs[component];
  if (!Component)
    throw new Error(`"${component}" is not a supported component type.`);
  const sharedProps = {
    name,
    error: errors[name],
    required: otherProps?.rules?.required,
    options: typeof options === 'function' ? options(currentData) : options,
    ...otherProps,
  };
  if (typeof options === 'function' && !sharedProps.options) {
    return null;
  }
  switch (component) {
    case 'ObjectInput':
      return <Component {...props} />;
    case 'AddressLookup':
    case 'DateInput':
      return <Component control={control} {...sharedProps} />;
    default:
      return <Component {...sharedProps} />;
  }
};

DynamicInput.propTypes = {
  component: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  currentData: PropTypes.object.isRequired,
  rules: PropTypes.shape({
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }),
};

export default DynamicInput;
