import { Form } from '../forms.types';
import { format } from 'date-fns';
import { ChildProtectionCategoryOptions } from 'types';

const form: Form = {
  id: 'case-status-edit',
  name: 'Edit/end case status',
  groupRecordable: false,
  isViewableByAdults: false,
  isViewableByChildrens: true,

  steps: [
    {
      id: 'editCINCaseStatus',
      name: 'Edit a status',
      theme: 'Case status',
      fields: [
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'notes',
          question: 'Notes',
          type: 'textarea',
          required: false,
        },
      ],
    },
    {
      id: 'editCPCaseStatus',
      name: 'Edit a status',
      theme: 'Case status',
      fields: [
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'category',
          question: 'Category of child protection plan',
          required: true,
          type: 'radios',
          default: 'C1',
          choices: [
            {
              value: 'C1',
              label: ChildProtectionCategoryOptions['C1'],
            },
            {
              value: 'C2',
              label: ChildProtectionCategoryOptions['C2'],
            },
            {
              value: 'C3',
              label: ChildProtectionCategoryOptions['C3'],
            },
            {
              value: 'C4',
              label: ChildProtectionCategoryOptions['C4'],
            },
          ],
        },
      ],
    },
  ],
};
export default form;
