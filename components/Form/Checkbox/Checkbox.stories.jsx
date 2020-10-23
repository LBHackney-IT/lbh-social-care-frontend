import Checkbox from './Checkbox';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Checkbox',
};

export const withError = Template.bind({});
withError.args = {
  label: 'Checkbox',
  error: { message: 'Ops! There was an error!' },
};
