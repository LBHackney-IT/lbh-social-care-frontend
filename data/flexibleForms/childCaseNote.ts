import { Form } from './forms.types';

const form: Form = {
  id: 'Child Case Note',
  name: 'Child Case Note',
  groupRecordable: true,
  taggable: true,
  isViewableByAdults: false,
  isViewableByChildrens: false,
  steps: [
    {
      id: 'Case note',
      name: 'Case Note',
      theme: 'Case note',
      fields: [
        {
          id: 'Case note title',
          question: 'Case Note Title',
          type: 'textarea',
        },
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
              value: 'Independent reviewing officer oversight',
              label: 'Independent reviewing officer oversight',
            },
            {
              value: 'Unit meeting note',
              label: 'Unit meeting note',
            },
            {
              label: 'PMU',
              value: 'PMU',
            },
            {
              value: 'Other',
              label: 'Other',
            },
          ],
        },
        {
          id: 'Other type',
          question: "If 'Other' please provide case note type",
          type: 'textarea',
          required: true,
          condition: {
            id: 'Type',
            value: 'Other',
          },
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
          id: 'Case note description?',
          question: 'Case note description?',
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
      ],
    },
  ],
};

export default form;
