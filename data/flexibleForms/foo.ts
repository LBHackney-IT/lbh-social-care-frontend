import { Form } from './forms.types';

const form: Form = {
  id: 'foo',
  name: 'Foo',
  steps: [
    {
      id: 'Living situation',
      name: 'Living situation',
      theme: 'About you',
      fields: [
        {
          id: 'Primary address tenure type',
          question: 'Primary address tenure type',
          type: 'tags',
          required: true,
        },
      ],
    },
  ],
};

export default form;
