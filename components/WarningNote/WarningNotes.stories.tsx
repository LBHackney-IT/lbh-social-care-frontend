import { WarningBox, Props } from './WarningNotes';
import { Story } from '@storybook/react';

export default {
  title: 'WarningBox',
  component: WarningBox,
};

const Template: Story<Props> = (args) => <WarningBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  notes: [
    {
      id: 234,
      type: 'Risk to Adults',
      createdDate: new Date(2020, 12, 12),
      createdBy: 'Foo',
      reviewedDate: new Date(2020, 12, 13),
      reviewedBy: 'Bar',
    },
  ],
};

export const multiWarningNote = Template.bind({});
multiWarningNote.args = {
  notes: [
    {
      id: 234,
      type: 'Risk to Adults',
      createdDate: new Date(2020, 12, 12),
      createdBy: 'Foo',
      reviewedDate: new Date(2020, 12, 13),
      reviewedBy: 'Bar',
    },
    {
      id: 44000000,
      type: 'Risk to Staff',
      createdDate: new Date(2020, 11, 12),
      createdBy: 'Boo',
      reviewedDate: new Date(2020, 12, 13),
      reviewedBy: 'Bar',
    },
  ],
};
