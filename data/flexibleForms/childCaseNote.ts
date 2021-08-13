import { Form } from './forms.types';
import { format } from 'date-fns';

const form: Form = {
  id: 'child-case-note',
  name: 'Case note',
  groupRecordable: true,
  isViewableByAdults: false,
  isViewableByChildrens: false,
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
          id: 'Were the child/children seen',
          question: 'Were the child/children seen?',
          type: 'radios',
          required: true,
          conditions: [
            {
              id: 'Type',
              value: 'Visit',
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
          id: 'Were the child/children seen alone',
          question: 'Were the child/children seen alone?',
          type: 'radios',
          required: true,
          conditions: [
            {
              id: 'Type',
              value: 'Visit',
            },
            {
              id: 'Were the child/children seen',
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
          id: 'Correspondence type',
          question: 'What kind of correspondence?',
          type: 'radios',
          error: 'You must choose a correspondance type',
          required: true,
          conditions: [
            {
              id: 'Type',
              value: 'Correspondence',
            },
          ],
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
          id: 'Visit occurance',
          question: 'How did the visit occur?',
          type: 'radios',
          hint: 'Choose one',
          required: true,
          error: 'You must choose an option',
          conditions: [
            {
              id: 'Type',
              value: 'Visit',
            },
          ],
          choices: [
            {
              value: 'Face to face',
              label: 'Face to face visit',
            },
            {
              value: 'Virtual',
              label: 'Virtual visit',
            },
            {
              value: 'Unsuccessful',
              label: 'Unsuccessful visit',
            },
          ],
        },
        {
          id: 'Visit type',
          question: 'What kind of visit?',
          type: 'radios',
          hint: 'Choose one option',
          required: true,
          error: 'You must choose a visit type',
          conditions: [
            {
              id: 'Type',
              value: 'Visit',
            },
          ],
          choices: [
            { label: 'Child in need visit', value: 'Child in need' },
            { label: 'CFS assessment visit', value: 'CFS assessment' },
            {
              label: 'Child protection visit',
              value: 'Child protection',
            },
            { label: 'Clinical visit', value: 'Clinical' },
            { label: 'Early help visit', value: 'Early help' },
            { label: 'Looked-after child visit', value: 'Looked-after child' },
            { label: 'Leaving care visit', value: 'Leaving care' },
            { label: 'Parenting support visit', value: 'Parenting support' },
            { label: 'Private fostering visit', value: 'Private fostering' },
            { label: 'Young Hackney visit ', value: 'Young Hackney ' },
            { label: 'P&D triage visit', value: 'P&D triage' },
            {
              label: 'P&D YH targeted support visit',
              value: 'P&D YH targeted support',
            },
            {
              label: 'Fostering supervision visit',
              value: 'Fostering supervision',
            },
            { label: 'Fostering support visit', value: 'Fostering support' },
            {
              label: 'Fostering unannounced visit',
              value: 'Fostering unannounced',
            },
          ],
        },
        {
          id: 'Topics',
          question: 'What kind of note is this?',
          hint: 'Choose all that apply',
          type: 'checkboxes',
          conditions: [
            {
              id: 'Type',
              value: 'Something else',
            },
          ],
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
          isfutureDateValid: false,
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
