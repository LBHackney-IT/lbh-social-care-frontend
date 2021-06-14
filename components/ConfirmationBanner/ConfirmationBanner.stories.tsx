import { Story } from '@storybook/react';

import ConfirmationBanner, { Props } from './ConfirmationBanner';

export default {
  title: 'ConfirmationBanner',
  component: ConfirmationBanner,
};

const Template: Story<Props> = (args) => <ConfirmationBanner {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Submission successfuk',
  children: 'Example body text here',
};
