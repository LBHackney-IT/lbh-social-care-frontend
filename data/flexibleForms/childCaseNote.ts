import { Form } from './forms.types';

const form: Form = {
  id: 'child-case-note',
  name: 'Case note',
  groupRecordable: true,
  isViewableByAdults: false,
  isViewableByChildrens: false,
  steps: [
    {
      id: 'foo',
      name: 'foo',
      theme: 'foo',
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
              value: 'phone-call',
              label: 'Phone call',
            },
            {
              value: 'email-letter-text-message',
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
              value: 'home',
              label: 'Home visit',
            },
            {
              value: 'office',
              label: 'Office visit',
            },
            {
              value: 'no-reply',
              label: 'No reply to home visit',
            },
          ],
        },

        {
          id: 'What happened?',
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
          hint: 'Help colleagues find this note. Add all that apply.',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};

export default form;
