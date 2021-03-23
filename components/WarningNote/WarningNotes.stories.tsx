import { WarningBox, Props } from './WarningNotes';
import { Story } from '@storybook/react';

import { mockedWarningNote } from 'factories/warningNotes';

export default {
  title: 'Warning Note',
  component: WarningBox,
};

const Template: Story<Props> = (args) => <WarningBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  personId: 123,
  notes: mockedWarningNote.slice(0, 1),
};

export const multiWarningNote = Template.bind({});
multiWarningNote.args = {
  personId: 123,
  notes: mockedWarningNote,
};
