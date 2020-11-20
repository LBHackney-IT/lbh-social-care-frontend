import EmailInput from './EmailInput';

export default {
  title: 'Form/EmailInput',
  component: EmailInput,
};

const Template = (args) => <EmailInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Email Input',
  hint: 'hello, I am a hint :)',
  name: 'emailInput',
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Email Input',
  hint: 'hello, I am a hint :)',
  name: 'emailInput',
  value: 'foobar@test.com',
};

export const withError = Template.bind({});
withError.args = {
  label: 'Email Input',
  name: 'emailInput',
  error: { message: 'Ops! There was an error!' },
};

export const withLabelSizeSmall = Template.bind({});
withError.args = {
  label: 'Email Input',
  labelSize: 's',
  name: 'emailInput',
};
