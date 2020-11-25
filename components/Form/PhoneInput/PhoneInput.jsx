import { TextInput } from '..';

const PhoneInput = (props) => (
  <TextInput {...props} minLength="5" type="tel"></TextInput>
);

export default PhoneInput;
