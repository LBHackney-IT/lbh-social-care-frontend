import { Form } from './forms.types';

const formData: Form[] = [
  {
    id: 'assessment',
    name: 'Social care assessment',
    steps: [
      {
        id: 'foo',
        name: 'Foo',
        theme: 'About you',
        fields: [],
      },
      {
        id: 'bar',
        name: 'Bar',
        theme: 'More stuff',
        fields: [
          {
            id: 'example question',
            question: "What's your favourite colour?",
            type: 'select',
            required: false,
            choices: [
              {
                value: 'red',
                label: 'Red',
              },
              {
                value: 'green',
                label: 'Green',
              },
            ],
          },
        ],
      },
      {
        id: 'your-medication-and-symptoms',
        name: 'Your medication and symptoms',
        theme: 'About you',
        fields: [
          {
            id: 'prescribed-medications',
            question: 'Are you taking any prescribed medications?',
            hint: 'For example, XYZ',
            type: 'radios',
            className: 'govuk-radios--inline',
            required: true,
            choices: [
              {
                value: 'true',
                label: 'Yes',
              },
              {
                value: 'false',
                label: 'No',
              },
            ],
          },
          {
            id: 'medications',
            question: 'Which medications?',
            error: 'This is a custom error message',
            type: 'textarea',
            required: true,
            condition: {
              id: 'prescribed-medications',
              value: 'true',
            },
          },
          {
            id: 'support-taking-or-using-medicatons',
            question: 'Do you need support taking or using medication?',
            type: 'text',
            required: true,
            prefill: 'firstName',
          },
          {
            id: 'repeater-example',
            question: 'Example repeater question',
            type: 'repeater',
            hint: 'Example hint',
            required: true,
          },
          {
            id: 'pain-or-distress',
            question:
              'Does your physical condition or any medication that you are taking cause you pain or distress?',
            type: 'radios',
            className: 'govuk-radios--inline',
            required: true,
            choices: [
              {
                value: 'true',
                label: 'Yes',
              },
              {
                value: 'false',
                label: 'No',
              },
            ],
          },
          {
            id: 'adequate-pain-relief',
            question:
              'Are you getting adequate relief from pain or other distressing physical symptoms?',
            type: 'radios',
            className: 'govuk-radios--inline',
            required: true,
            choices: [
              {
                value: 'true',
                label: 'Yes',
              },
              {
                value: 'false',
                label: 'No',
              },
            ],
          },
          {
            id: 'difficulty-breathing',
            question: 'Do you have difficulty breathing?',
            type: 'radios',
            className: 'govuk-radios--inline',
            required: true,
            choices: [
              {
                value: 'true',
                label: 'Yes',
              },
              {
                value: 'false',
                label: 'No',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'example',
    name: 'Case note',
    steps: [
      {
        id: 'bar',
        name: 'Bar',
        theme: 'More stuff',
        fields: [
          {
            id: 'example question',
            question: "What's your favourite colour?",
            type: 'select',
            required: false,
            choices: [
              {
                value: 'red',
                label: 'Red',
              },
              {
                value: 'green',
                label: 'Green',
              },
            ],
          },
        ],
      },
    ],
  },
];

export default formData;
