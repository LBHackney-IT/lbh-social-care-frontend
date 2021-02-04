import { TextInput } from '..';

const PhoneInput = (props) => (
  <TextInput {...props} minLength="5" type="number"></TextInput>
);

export default PhoneInput;
