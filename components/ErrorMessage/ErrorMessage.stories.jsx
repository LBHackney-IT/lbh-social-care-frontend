import ErrorMessage from './ErrorMessage';

export default {
  title: 'ErrorMessage',
  component: ErrorMessage,
};

const Template = (args) => <ErrorMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'I am an error',
};
