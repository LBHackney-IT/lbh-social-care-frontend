import { Form } from './forms.types';

const form: Form = {
  id: 'foo',
  name: 'Foo',
  isViewableByAdults: false,
  isViewableByChildrens: false,
  approvable: true,
  steps: [
    {
      id: 'Living situation',
      name: 'Living situation',
      theme: 'About you',
      fields: [
        {
          id: 'Primary address tenure type',
          question: 'Topics',
          hint: 'Add as many as you need',

          type: 'Tags',
          required: true,
          itemName: 'topic',
        },
      ],
    },
  ],
};

export default form;
