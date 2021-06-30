import { Form } from './forms.types';

const form: Form = {
  id: 'child-case-note',
  name: 'Case note',
  groupRecordable: true,
  steps: [
    {
      id: 'foo',
      name: 'foo',
      theme: 'foo',
      fields: [
        {
          id: 'type',
          question: 'What kind of note is this?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'visit',
              label: 'Visit',
            },
            {
              value: 'correspondence',
              label: 'Correspondence',
            },
            {
              value: 'something-else',
              label: 'Something else',
            },
          ],
        },
        {
          id: 'correspondence-type',
          question: 'What kind of correspondence?',
          type: 'radios',
          required: true,
          condition: {
            id: 'type',
            value: 'correspondence',
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
          id: 'visit-type',
          question: 'What kind of visit?',
          type: 'radios',
          required: true,
          condition: {
            id: 'type',
            value: 'visit',
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
          id: 'body',
          question: 'What happened?',
          type: 'textarea',
        },

        {
          id: 'actions',
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
              type: 'text',
              className: 'govuk-input--width-10',
            },
          ],
        },

        {
          id: 'topics',
          question: 'Topics',
          hint: 'Help colleagues find this note. Add all that apply.',
          // type: 'tags',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};

export default form;
