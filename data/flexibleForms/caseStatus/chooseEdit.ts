import { Form } from '../forms.types';

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
          id: 'action',
          question: 'What do you need to do with the status?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'edit',
              label: 'I need to make a correction',
            },
            {
              value: 'update',
              label: 'I need to update the circumstances',
            },
            {
              value: 'end',
              label: 'I need to end this status',
            },
          ],
        },
      ],
    },
    {
      id: 'editLACCaseStatus',
      name: 'Edit a LAC status',
      theme: 'Case status',
      fields: [
        {
          id: 'action',
          question: 'What do you need to do with the status?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'edit',
              label: 'I need to make a correction',
            },
            {
              value: 'update',
              label: 'I need to update the circumstances',
            },
            {
              value: 'end',
              label: 'I need to end this status',
            },
          ],
        },
      ],
    },
  ],
};
export default form;
