import { Form, Choice } from '../forms.types';
import { format } from 'date-fns';
import { LACLegalStatusOptions, LACPlacementTypeOptions } from 'types';

const lac_legal_status_options: Choice[] = [];
const lac_placement_reason_options: Choice[] = [];

Object.keys(LACPlacementTypeOptions).map((key) => {
  lac_placement_reason_options.push({
    value: key,
    label: LACPlacementTypeOptions[key as keyof typeof LACPlacementTypeOptions],
  });
});
Object.keys(LACLegalStatusOptions).map((key) => {
  lac_legal_status_options.push({
    value: key,
    label: LACLegalStatusOptions[key as keyof typeof LACLegalStatusOptions],
  });
});
const form: Form = {
  id: 'case-status-update',
  name: 'Edit/end case status',
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
          id: 'legalStatus',
          question: "What is the child's legal status?",
          type: 'select',
          choices: lac_legal_status_options,
          required: false,
        },
        {
          id: 'placementType',
          question: "What is the child's placement type?",
          type: 'select',
          choices: lac_placement_reason_options,
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
