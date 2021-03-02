import { Story } from '@storybook/react';

import { TextInputNoType } from 'components/Form/types';

import NumberInput from './NumberInput';

export default {
  title: 'Form Components/NumberInput',
  component: NumberInput,
};

const Template: Story<TextInputNoType> = (args) => <NumberInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Number Input',
  hint: 'hello, I am a hint :)',
  name: 'numberInput',
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Number Input',
  hint: 'hello, I am a hint :)',
  name: 'numberInput',
  value: '2423252626',
};

export const withError = Template.bind({});
withError.args = {
  label: 'Number Input',
  name: 'numberInput',
  error: { message: 'Ops! There was an error!' },
};

export const withLabelSizeSmall = Template.bind({});
withLabelSizeSmall.args = {
  label: 'Number Input',
  labelSize: 's',
  name: 'numberInput',
};
