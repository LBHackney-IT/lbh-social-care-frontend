import { Form } from './forms.types';
import { format } from 'date-fns';

const form: Form = {
  id: 'adult-case-note',
  name: 'Case note',
  groupRecordable: true,
  isViewableByAdults: true,
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
          id: 'Visit type',
          question: 'What kind of visit?',
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
              value: 'Home',
              label: 'Home visit',
            },
            {
              value: 'Office',
              label: 'Office visit',
            },
            {
              value: 'Virtual',
              label: 'Virtual visit',
            },
            {
              value: 'No reply to home visit',
              label: 'No reply to home visit',
            },
          ],
        },

        {
          id: 'Topics',
          question: 'Topics',
          hint: 'Help colleagues find this note. Add as many as you need.',
          type: 'checkboxes',
          conditions: [
            {
              id: 'Type',
              value: 'Something else',
            },
          ],
          choices: [
            {
              label: 'Additional hours requested',
              value: 'Additional hours requested',
            },
            { label: 'Care charges', value: 'Care charges' },
            { label: 'Case audit', value: 'Case audit' },
            { label: 'Case summary', value: 'Case summary' },
            { label: 'Case transfer', value: 'Case transfer' },
            { label: 'Contact Adults', value: 'Contact Adults' },
            {
              label: 'Contact with health professional',
              value: 'Contact with health professional',
            },
            { label: 'Death notification', value: 'Death notification' },
            {
              label: 'Discharge planning - HSWT',
              value: 'Discharge planning - HSWT',
            },
            { label: 'Duty action', value: 'Duty action' },
            { label: 'ILDS duty action', value: 'ILDS duty action' },
            {
              label: 'Integrated independence team progress',
              value: 'Integrated independence team progress',
            },
            {
              label: 'Legacy adult assessment',
              value: 'Legacy adult assessment',
            },
            { label: "Manager's decision", value: "Manager's decision" },
            { label: 'Record of meeting', value: 'Record of meeting' },
            {
              label: 'Record of supervision discussion',
              value: 'Record of supervision discussion',
            },
            { label: 'Safeguarding', value: 'Safeguarding' },
            {
              label: 'Significant information on an open case',
              value: 'Significant information on an open case',
            },
          ],
        },

        {
          id: 'Title',
          question: 'Title',
          type: 'text',
          className: 'govuk-input--width-20',
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
