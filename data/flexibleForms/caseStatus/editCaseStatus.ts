import { Form } from '../forms.types';
import { format } from 'date-fns';

const form: Form = {
  id: 'case-status-edit',
  name: 'Edit/end case status',
  groupRecordable: false,
  isViewableByAdults: false,
  isViewableByChildrens: true,

  steps: [
    {
      id: 'editCaseStatus',
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
  ],
};
export default form;
