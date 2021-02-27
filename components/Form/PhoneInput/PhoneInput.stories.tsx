import { Story } from '@storybook/react';

import { TextInputNoType as Args } from 'components/Form/types';

import PhoneInput from './PhoneInput';

export default {
  title: 'Form Components/PhoneInput',
  component: PhoneInput,
};

const Template: Story<Args> = (args) => <PhoneInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Phone Input',
  hint: 'hello, I am a hint :)',
  name: 'phoneInput',
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Phone Input',
  hint: 'hello, I am a hint :)',
  name: 'phoneInput',
  value: '07242325262',
};

export const withError = Template.bind({});
withError.args = {
  label: 'Phone Input',
  name: 'phoneInput',
  error: { message: 'Ops! There was an error!' },
};

export const withLabelSizeSmall = Template.bind({});
withLabelSizeSmall.args = {
  label: 'Phone Input',
  labelSize: 's',
  name: 'phoneInput',
};
