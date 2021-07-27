import { Form } from './forms.types';

const forms: Form[] = [
  {
    id: '21hsfQuDZQjNEvikC9QRzf',
    name: 'Social care assessment (sandbox form)',
    isViewableByChildrens: false,
    isViewableByAdults: false,
    groupRecordable: true,
    approvable: true,
    panelApprovable: true,
    steps: [
      {
        id: 'Health and wellbeing',
        name: 'Health and wellbeing',
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
        theme: 'About you',
      },
      {
        id: 'Test step 1',
        name: 'Test step 1',
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
        theme: 'About you',
      },
      {
        id: 'The best step',
        name: 'The best step',
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
        theme: 'About you',
      },
      {
        id: 'Your care history',
        name: 'Your care history',
        intro: 'Here we will describe the purpose of the step.',
        fields: [
          {
            id: 'What is your history?',
            question: 'What is your history?',
            hint: 'It happened in the past.',
            type: 'checkboxes',
            choices: [
              {
                label: 'A good history',
                value: 'A good history',
              },
              {
                label: 'An ok history',
                value: 'An ok history',
              },
              {
                label: 'A bad history',
                value: 'A bad history',
              },
            ],
            required: true,
            error: 'That is not a history',
          },
        ],
        theme: 'Your care',
      },
    ],
  },
];

export default forms;
