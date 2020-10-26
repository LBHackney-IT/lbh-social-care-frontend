import TextInput from './TextInput';

export default {
  title: 'Form/TextInput',
  component: TextInput,
};

const Template = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'TextInput',
  hint: 'hello, I am a hint :)',
  name: 'textInput',
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'TextInput',
  hint: 'hello, I am a hint :)',
  name: 'textInput',
  value: 'foobar',
};

export const WithTextNumber = Template.bind({});
WithTextNumber.args = {
  label: 'TextInput - number',
  hint: 'hello, I am a number input :)',
  name: 'textInput',
  type: 'number',
};

export const withError = Template.bind({});
withError.args = {
  label: 'TextInput',
  name: 'textInput',
  error: { message: 'Ops! There was an error!' },
};

export const withLabelSizeSmall = Template.bind({});
withError.args = {
  label: 'TextInput',
  labelSize: 's',
  name: 'textInput',
};
