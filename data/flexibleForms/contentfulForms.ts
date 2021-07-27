import { Form } from './forms.types';

const forms: Form[] = [
  {
    id: '21hsfQuDZQjNEvikC9QRzf',
    name: 'Social care assessment (sandbox form)',
    isViewableByChildrens: true,
    isViewableByAdults: false,
    groupRecordable: true,
    approvable: true,
    panelApprovable: true,
    steps: [
      {
        id: 'Health and wellbeing',
        name: 'Health and wellbeing',
        theme: 'About you',
        fields: [
          {
            id: 'Are you taking any prescription medication?',
            question: 'Are you taking any prescription medication?',
            type: 'text',
            hint: 'kkkkkkk',
            required: true,
          },
          {
            id: 'Which medications?',
            question: 'Which medications?',
            type: 'text',
          },
          {
            id: 'What is their favourite colour?',
            question: 'What is their favourite colour?',
            type: 'radios',
            hint: 'All the colours of the rainbow',
            choices: [
              {
                label: 'red',
                value: 'red',
              },
              {
                label: 'blue',
                value: 'blue',
              },
              {
                label: 'green',
                value: 'green',
              },
            ],
          },
        ],
      },
      {
        id: 'Test step 1',
        name: 'Test step 1',
        theme: 'About you',
        fields: [
          {
            id: 'How many needles are in this haystack?',
            question: 'How many needles are in this haystack?',
            type: 'checkboxes',
            hint: 'Between zero and infinity',
            choices: [
              {
                label: 'one',
                value: 'one',
              },
              {
                label: 'two',
                value: 'two',
              },
              {
                label: 'three',
                value: 'three',
              },
              {
                label: 'four',
                value: 'four',
              },
              {
                label: 'five',
                value: 'five',
              },
            ],
            required: false,
            error: 'That is not a number of pins',
          },
        ],
      },
      {
        id: 'The best step',
        name: 'The best step',
        theme: 'About you',
        fields: [
          {
            id: 'How many needles are in this haystack?',
            question: 'How many needles are in this haystack?',
            type: 'checkboxes',
            hint: 'Between zero and infinity',
            choices: [
              {
                label: 'one',
                value: 'one',
              },
              {
                label: 'two',
                value: 'two',
              },
              {
                label: 'three',
                value: 'three',
              },
              {
                label: 'four',
                value: 'four',
              },
              {
                label: 'five',
                value: 'five',
              },
            ],
            required: false,
            error: 'That is not a number of pins',
          },
          {
            id: 'What is their favourite colour?',
            question: 'What is their favourite colour?',
            type: 'radios',
            hint: 'All the colours of the rainbow',
            choices: [
              {
                label: 'red',
                value: 'red',
              },
              {
                label: 'blue',
                value: 'blue',
              },
              {
                label: 'green',
                value: 'green',
              },
            ],
          },
        ],
      },
    ],
  },
];

export default forms;
