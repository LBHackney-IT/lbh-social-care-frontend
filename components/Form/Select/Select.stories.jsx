import Select from './Select';

export default {
  title: 'Form/Select',
  component: Select,
};

const Template = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Select',
  hint: 'hello, I am a hint :)',
  name: 'select',
  options: ['foo', 'bar', 'foobar'],
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Select',
  hint: 'hello, I am a hint :)',
  name: 'select',
  options: ['foo', 'bar', 'foobar'],
  value: 'foobar',
};

export const withError = Template.bind({});
withError.args = {
  label: 'Select',
  name: 'select',
  options: ['foo', 'bar', 'foobar'],
  error: { message: 'Ops! There was an error!' },
};
