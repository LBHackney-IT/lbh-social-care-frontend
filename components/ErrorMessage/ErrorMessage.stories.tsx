import { Story } from '@storybook/react';

import ErrorMessage, { Props } from './ErrorMessage';

export default {
  title: 'ErrorMessage',
  component: ErrorMessage,
};

const Template: Story<Props> = (args) => <ErrorMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'I am an error',
};
