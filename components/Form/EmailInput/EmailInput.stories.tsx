import { Story } from '@storybook/react';

import { TextInputNoType } from 'components/Form/types';

import EmailInput from './EmailInput';

export default {
  title: 'Form Components/EmailInput',
  component: EmailInput,
};

const Template: Story<TextInputNoType> = (args) => <EmailInput {...args} />;

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
  name: 'withError',
  error: { message: 'Ops! There was an error!' },
};

export const withLabelSizeSmall = Template.bind({});
withLabelSizeSmall.args = {
  label: 'Email Input',
  labelSize: 's',
  name: 'emailInput',
};
