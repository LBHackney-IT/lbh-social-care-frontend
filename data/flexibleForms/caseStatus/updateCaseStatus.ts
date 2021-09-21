import { Form } from '../forms.types';
import { format } from 'date-fns';

const form: Form = {
  id: 'case-status-update',
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
          id: 'legalStatus',
          question: 'Do you need to change the legal status?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'Y',
              label: 'Yes',
            },
            {
              value: 'N',
              label: 'No',
            },
          ],
        },
        {
          id: 'legalStatusChangeDate',
          question: 'When will the change take effect?',
          type: 'date',
          required: true,
          conditions: [
            {
              id: 'legalStatus',
              value: 'Y',
            },
          ],
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
        },
        {
          id: 'newLegalStatus',
          question: 'What is the new legal status?',
          type: 'select',
          required: true,
          conditions: [
            {
              id: 'legalStatus',
              value: 'Y',
            },
          ],
          choices: [
            {
              value: 'placeholder',
              label: 'Yes',
            },
          ],
        },
        {
          id: 'placementType',
          question: 'Do you need to change the placement type?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'Y',
              label: 'Yes',
            },
            {
              value: 'N',
              label: 'No',
            },
          ],
        },
        {
          id: 'placementTypeChangeDate',
          question: 'When will the change take effect?',
          type: 'date',
          required: true,
          conditions: [
            {
              id: 'placementType',
              value: 'Y',
            },
          ],
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
        },
        {
          id: 'newPlacementType',
          question: 'What is the new legal status?',
          type: 'select',
          required: true,
          conditions: [
            {
              id: 'placementType',
              value: 'Y',
            },
          ],
          choices: [
            {
              value: 'placeholder',
              label: 'Yes',
            },
          ],
        },
      ],
    },
  ],
};
export default form;
