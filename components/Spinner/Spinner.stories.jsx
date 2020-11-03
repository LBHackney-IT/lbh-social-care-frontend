import Spinner from './Spinner';

export default {
  title: 'Spinner',
  component: Spinner,
};

const Template = (args) => <Spinner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Spinner',
};
