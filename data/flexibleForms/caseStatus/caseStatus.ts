import { Form, Choice } from '../forms.types';
import { format } from 'date-fns';
import { ChildProtectionCategoryOptions } from 'types';

const child_protection_category_options: Choice[] = [];

Object.keys(ChildProtectionCategoryOptions).map((key) => {
  child_protection_category_options.push({
    value: key,
    label:
      ChildProtectionCategoryOptions[
        key as keyof typeof ChildProtectionCategoryOptions
      ],
  });
});

const form: Form = {
  id: 'case-status',
  name: 'Case status',
  groupRecordable: false,
  isViewableByAdults: false,
  isViewableByChildrens: true,
  canonicalUrl: (socialCareId) => `/people/${socialCareId}/case-status/edit`,

  steps: [
    {
      id: 'caseStatus',
      name: 'Flag a status',
      theme: 'Case status',
      fields: [
        {
          id: 'type',
          question: 'What is the case status you would like to add?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'CIN',
              label: 'Child in need',
            },
            {
              value: 'CP',
              label: 'Child protection',
            },
          ],
        },
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          conditions: [
            {
              id: 'type',
              value: 'CIN',
            },
          ],
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'notes',
          question: 'Notes',
          conditions: [
            {
              id: 'type',
              value: 'CIN',
            },
          ],
          type: 'textarea',
          required: false,
        },
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          conditions: [
            {
              id: 'type',
              value: 'CP',
            },
          ],
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'category',
          question: 'Category of child protection plan',
          type: 'radios',
          conditions: [
            {
              id: 'type',
              value: 'CP',
            },
          ],
          choices: child_protection_category_options,
          required: true,
        },
      ],
    },
  ],
};
export default form;
