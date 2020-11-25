import PhoneInput from './PhoneInput';

export default {
  title: 'Form/PhoneInput',
  component: PhoneInput,
};

const Template = (args) => <PhoneInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Phone Input',
  hint: 'hello, I am a hint :)',
  name: 'phoneInput',
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Phone Input',
  hint: 'hello, I am a hint :)',
  name: 'phoneInput',
  value: '07242325262',
};

export const withError = Template.bind({});
withError.args = {
  label: 'Phone Input',
  name: 'phoneInput',
  error: { message: 'Ops! There was an error!' },
};

export const withLabelSizeSmall = Template.bind({});
withError.args = {
  label: 'Phone Input',
  labelSize: 's',
  name: 'phoneInput',
};
