import { Form } from './forms.types';

const choices = [
  {
    value: 'yes',
    label: 'Yes',
  },
  { value: 'no', label: 'No' },
];

const form: Form = {
  id: 'foo',
  name: 'Sandbox form',
  isViewableByAdults: false,
  isViewableByChildrens: false,
  approvable: true,
  panelApprovable: true,
  steps: [
    {
      id: 'Living situation',
      name: 'Living situation',
      theme: 'About you',
      fields: [
        {
          id: 'one',
          type: 'radios',
          question: 'First question',
          choices,
          required: true,
        },
        {
          id: 'two',
          type: 'radios',
          question: 'Second question',
          choices,
          required: true,
          conditions: [
            {
              id: 'one',
              value: 'yes',
            },
          ],
        },
        {
          id: 'three',
          type: 'radios',
          question: 'Third question',
          choices,
          required: true,
          conditions: [
            {
              id: 'one',
              value: 'yes',
            },
            {
              id: 'two',
              value: 'yes',
            },
          ],
        },
      ],
    },
  ],
};

export default form;
