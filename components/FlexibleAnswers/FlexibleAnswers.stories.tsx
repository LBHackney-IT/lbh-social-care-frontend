import { Story } from '@storybook/react';

import FlexibleAnswers from './FlexibleAnswers';

export default {
  title: 'FlexibleAnswers',
  component: FlexibleAnswers,
};

const Template: Story = (args) => <FlexibleAnswers data={args.data} />;

export const Default = Template.bind({});

Default.args = {
  data: {
    'Bar section': { 'Example question': 'red' },
    'Foo section': {
      Date: '2021-05-06',
      Name: 'Foo',
      'key-contacts': [
        {
          Blah: 'Choice one',
          Bar: ['Choice one'],
          Date: '2021-05-21',
          Name: 'Foo',
          Name2: ['Blah', 'Blah'],
          Address: 'Choice two',
          'Relationship role': 'Test',
        },
      ],
      'Repeater example': ['Bar', 'Test'],
    },
    'Your medication and symptoms': {
      Medications: '',
      'Pain or distress': 'Yes',
      'Adequate pain relief': 'No',
      'Difficulty breathing': 'No',
      'Prescribed medications': 'No',
      'Support taking or using medicatons': 'Spicy',
    },
  },
};
