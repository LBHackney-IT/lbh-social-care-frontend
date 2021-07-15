import { Form } from './forms.types';
import tags from 'data/caseNoteTags';

const form: Form = {
  id: 'child-case-note',
  name: 'Case note',
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
          id: 'Were the child/children seen',
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
          id: 'Were the child/children seen alone',
          question: 'Were the child/children seen alone?',
          type: 'radios',
          required: true,
          condition: [
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
          id: 'Topics',
          question: 'Topics',
          hint: 'Help colleagues find this note. Add as many as you need, or create new ones.',
          type: 'tags',
          className: 'govuk-input--width-20',
          choices: tags,
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
          type: 'date',
          className: 'govuk-input--width-10',
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
      ],
    },
  ],
};
export default form;
