import { Story } from '@storybook/react';

import { Select as Args } from 'components/Form/types';

import Select from './Select';

export default {
  title: 'Form Components/Select',
  component: Select,
};

const Template: Story<Args> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Select',
  hint: 'hello, I am a hint :)',
  name: 'select',
  options: ['foo', 'bar', 'foobar'],
};

export const Required = Template.bind({});
Required.args = {
  label: 'Select',
  hint: 'hello, I am a hint :)',
  name: 'select',
  options: ['foo', 'bar', 'foobar'],
  required: true,
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Select',
  hint: 'hello, I am a hint :)',
  name: 'select',
  options: ['foo', 'bar', 'foobar'],
  value: 'foobar',
};

export const withError = Template.bind({});
withError.args = {
  label: 'Select',
  name: 'select',
  options: ['foo', 'bar', 'foobar'],
  error: { message: 'Ops! There was an error!' },
};
