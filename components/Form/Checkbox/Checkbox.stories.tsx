import { Story } from '@storybook/react';

import Checkbox from './Checkbox';
import type { Checkbox as Args } from 'components/Form/types';

export default {
  title: 'Form Components/Checkbox',
  component: Checkbox,
};

const Template: Story<Args> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Checkbox',
};

export const multiSelect = Template.bind({});
multiSelect.args = {
  label: 'Multi Checkbox',
  hint: 'You can select multiple values',
  options: ['foo', 'bar', 'foobar'],
};

export const withError = Template.bind({});
withError.args = {
  label: 'Checkbox',
  error: { message: 'Ops! There was an error!' },
};
