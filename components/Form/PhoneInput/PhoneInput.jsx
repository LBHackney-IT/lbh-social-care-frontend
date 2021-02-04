import { TextInput } from '..';

const PhoneInput = ({ rules, ...props }) => (
  <TextInput
    {...props}
    rules={{ minLength: 5, ...rules }}
    type="number"
  ></TextInput>
);

export default PhoneInput;
