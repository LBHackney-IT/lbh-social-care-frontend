import { Form } from './forms.types';
import { format } from 'date-fns';

const form: Form = {
  id: 'child-case-note',
  name: 'Case note',
  groupRecordable: true,
  isViewableByAdults: false,
  isViewableByChildrens: true,
  canonicalUrl: (socialCareId) => `/people/${socialCareId}/case-note`,
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
          error: 'You must give this note a type',
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
              value: 'Face to face',
              label: 'Face to face visit',
            },
            {
              value: 'Office',
              label: 'Office visit',
            },
            {
              value: 'Unsuccessful',
              label: 'Unsuccessful visit',
            },
          ],
        },
        {
          id: 'Child/children seen?',
          question: 'Were the child/children seen?',
          type: 'radios',
          required: true,
          condition: {
            id: 'Type',
            value: 'Visit',
          },
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Child/children seen alone?',
          question: 'Were the child/children seen alone?',
          type: 'radios',
          required: true,
          condition: [
            {
              id: 'No',
              value: 'No',
            },
            {
              id: 'Yes',
              value: 'Yes',
            },
          ],
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Topics',
          question: 'Topics',
          hint: 'Help colleagues find this note. Add as many as you need.',
          type: 'checkboxes',
          condition: {
            id: 'Type',
            value: 'Something else',
          },
          choices: [
            { label: 'Unit meeting note', value: 'Unit meeting note' },
            { label: 'Allocation record', value: 'Allocation record' },
            { label: 'Case audit', value: 'Case audit' },
            { label: 'Clinical input', value: 'Clinical input' },
            {
              label: 'Consultation with service manager',
              value: 'Consultation with service manager',
            },
            {
              label: 'Consultation with head of service',
              value: 'Consultation with head of service',
            },
            {
              label: 'Consultation with independent reviewing officer',
              value: 'Consultation with independent reviewing officer',
            },
            {
              label: 'Independent reviewing officer oversight',
              value: 'Independent reviewing officer oversight',
            },
            { label: 'Management oversight', value: 'Management oversight' },
            { label: 'MARAC', value: 'MARAC' },
            { label: 'MAPPA', value: 'MAPPA' },
            { label: 'PMU', value: 'PMU' },
            {
              label: 'Extra-familial risk panel',
              value: 'Extra-familial risk panel',
            },
            {
              label: 'Escalation with independent chair',
              value: 'Escalation with independent chair',
            },
            {
              label: 'Escalation with service manager',
              value: 'Escalation with service manager',
            },
            { label: 'Record of meeting', value: 'Record of meeting' },
            {
              label: 'Safe and together consultation',
              value: 'Safe and together consultation',
            },
            {
              label: 'Out of hours',
              value: 'Out of hours',
            },
          ],
        },

        {
          id: 'Title',
          question: 'Title',
          type: 'text',
          className: 'govuk-input--width-20',
          required: true,
          error: 'You must give this note a title',
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
          type: 'datetime',
          default: [
            format(new Date(), 'yyyy-MM-dd'),
            format(new Date(), 'HH:00'),
          ],
        },
        {
          id: 'Actions',
          question: 'Actions',
          type: 'repeaterGroup',
          hint: 'eg. Dave to contact landlord',
          itemName: 'action',
          hiddenRepeater: true,
          subfields: [
            {
              id: 'Action',
              question: 'What needs to be done?',
              type: 'text',
              required: true,
            },
            {
              id: 'Assignee',
              question: 'Assigned to',
              type: 'text',
              className: 'govuk-input--width-10',
            },
            {
              id: 'Due',
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
