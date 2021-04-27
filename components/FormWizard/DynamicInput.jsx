import PropTypes from 'prop-types';
import get from 'lodash/get';

import * as Inputs from 'components/Form';

const enhanceValidate = (validate, currentData) =>
  typeof validate === 'function'
    ? (value) => validate(value, currentData)
    : Object.entries(validate).reduce(
        (acc, [key, validation]) => ({
          ...acc,
          [key]: (value) => validation(value, currentData),
        }),
        {}
      );

const DynamicInput = (props) => {
  const {
    component,
    control,
    errors,
    name,
    options,
    currentData,
    register,
    rules,
    ...otherProps
  } = props;
  const Component = Inputs[component];
  if (!Component)
    throw new Error(`"${component}" is not a supported component type.`);
  const sharedProps = {
    name,
    error: get(errors, name),
    required: rules?.required,
    options: typeof options === 'function' ? options(currentData) : options,
    rules: {
      ...rules,
      validate: rules?.validate && enhanceValidate(rules.validate, currentData),
    },
    ...otherProps,
  };
  if (typeof options === 'function' && !sharedProps.options) {
    return null;
  }
  switch (component) {
    case 'ObjectInput':
      return <Component {...props} />;
    case 'AddressLookup':
    case 'Autocomplete':
    case 'DateInput':
      return <Component control={control} {...sharedProps} />;
    default:
      return <Component register={register} {...sharedProps} />;
  }
};

DynamicInput.propTypes = {
  component: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  currentData: PropTypes.object.isRequired,
  labelSize: PropTypes.string,
  rules: PropTypes.shape(),
  register: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
};

export default DynamicInput;
