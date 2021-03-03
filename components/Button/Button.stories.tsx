import { Story } from '@storybook/react';

import Button, { Props } from './Button';

export default {
  title: 'Button',
  component: Button,
};

const Template: Story<Props> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  isSecondary: true,
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  label: 'Button',
  isSecondary: true,
  route: 'https://hackney.gov.uk/',
};
