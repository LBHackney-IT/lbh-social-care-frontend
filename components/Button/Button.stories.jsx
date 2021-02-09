import Button from './Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  isSecondary: 'true',
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  label: 'Button',
  isSecondary: 'true',
  route: 'https://hackney.gov.uk/',
};
