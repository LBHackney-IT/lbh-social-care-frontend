import PropTypes from 'prop-types';

import { TextInput } from '..';

const PhoneInput = ({ rules, ...props }) => (
  <TextInput
    {...props}
    rules={{
      minLength: {
        value: 5,
        message: 'Invalid phone number',
      },
      ...rules,
    }}
    type="number"
  ></TextInput>
);

PhoneInput.propTypes = {
  rules: PropTypes.object,
};

export default PhoneInput;
