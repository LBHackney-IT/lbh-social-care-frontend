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
      id: 'endCaseStatus',
      name: 'End a status',
      theme: 'Case status',
      fields: [
        {
          id: 'endDate',
          question: 'End Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
        },
      ],
    },
  ],
};
export default form;
