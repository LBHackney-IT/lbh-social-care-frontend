import { Story } from '@storybook/react';

import Spinner from './Spinner';

export default {
  title: 'Spinner',
  component: Spinner,
};

const Template: Story = (args) => <Spinner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Spinner',
};
