import { Form, Choice } from '../forms.types';
import { format } from 'date-fns';
import { ChildProtectionCategoryOptions } from 'types';

const cp_category: Choice[] = [];

Object.keys(ChildProtectionCategoryOptions).map((key) => {
  cp_category.push({
    value: key,
    label:
      ChildProtectionCategoryOptions[
        key as keyof typeof ChildProtectionCategoryOptions
      ],
  });
});
const form: Form = {
  id: 'case-status-update',
  name: "Update a child's circumstances (scheduled case status)",
  groupRecordable: false,
  isViewableByAdults: false,
  isViewableByChildrens: true,

  steps: [
    {
      id: 'updateCaseStatus',
      name: 'Update a status',
      theme: 'Case status',
      fields: [
        {
          id: 'category',
          question: 'Category of child protection plan',
          type: 'radios',
          choices: cp_category,
          required: true,
        },
        {
          id: 'startDate',
          question: 'When will the change take effect?',
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
