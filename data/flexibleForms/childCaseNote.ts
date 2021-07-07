import { Form } from './forms.types';

const form: Form = {
  id: 'Child Case Note',
  name: 'Child Case Note',
  groupRecordable: true,
  isViewableByAdults: false,
  isViewableByChildrens: false,
  steps: [
    {
      id: 'Case note',
      name: 'Case note',
      theme: 'Case note',
      fields: [
        {
          id: 'Type',
          question: 'What kind of note is this?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'Visit',
              label: 'Visit',
            },
            {
              value: 'Correspondence',
              label: 'Correspondence',
            },
            {
              value: 'Management oversight',
              label: 'Management oversight',
            },
            {
              value: 'Something else',
              label: 'Something else',
            },
          ],
        },
        {
          id: 'Correspondence type',
          question: 'What kind of correspondence?',
          type: 'radios',
          required: true,
          condition: {
            id: 'Type',
            value: 'Correspondence',
          },
          choices: [
            {
              value: 'Phone call',
              label: 'Phone call',
            },
            {
              value: 'Email, letter or text message',
              label: 'Email, letter or text message',
            },
          ],
        },
        {
          id: 'Visit type',
          question: 'What kind of visit?',
          type: 'radios',
          required: true,
          condition: {
            id: 'Type',
            value: 'Visit',
          },
          choices: [
            {
              value: 'Home',
              label: 'Home visit',
            },
            {
              value: 'Office',
              label: 'Office visit',
            },
            {
              value: 'No reply to home visit',
              label: 'No reply to home visit',
            },
          ],
        },

        {
          id: 'Body',
          question: 'What happened?',
          type: 'textarea',
          required: true,
        },

        {
          id: 'Date of event',
          question: 'When did this happen?',
          type: 'date',
          className: 'govuk-input--width-10',
        },

        {
          id: 'Actions',
          question: 'Actions',
          type: 'repeaterGroup',
          hint: 'eg. Dave to contact landlord',
          itemName: 'action',
          subfields: [
            {
              id: 'text',
              question: 'What needs to be done?',
              type: 'text',
              required: true,
            },
            {
              id: 'assignee',
              question: 'Assigned to',
              type: 'text',
              className: 'govuk-input--width-10',
            },
            {
              id: 'due',
              question: 'Due',
              type: 'date',
              className: 'govuk-input--width-10',
            },
          ],
        },
        {
          id: 'Topics',
          question: 'Topics',
          hint: 'Help colleagues find this note. Add as many as you need.',
          type: 'tags',
        },
      ],
    },
  ],
};

export default form;
