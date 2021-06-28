import { Form } from './forms.types';

const form: Form = {
  id: 'child-case-note',
  name: 'Case note',
  groupRecordable: true,
  steps: [
    {
      id: 'foo',
      name: 'foo',
      theme: 'foo',
      fields: [
        {
          id: 'body',
          question: 'What happened?',
          type: 'textarea',
        },
      ],
    },
  ],
};

export default form;
