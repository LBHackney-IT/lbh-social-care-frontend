import { Form } from './forms.types';
import { format } from 'date-fns';

const form: Form = {
  id: 'foo',
  name: 'Sandbox form',
  isViewableByAdults: false,
  isViewableByChildrens: false,
  approvable: true,
  panelApprovable: true,
  steps: [
    {
      id: 'Living situation',
      name: 'Living situation',
      theme: 'About you',
      fields: [
        {
          id: 'Date of event',
          question: 'When did this happen?',
          type: 'datetime',
          required: true,
          default: [
            format(new Date(), 'yyyy-MM-dd'),
            format(new Date(), 'HH:00'),
          ],
        },
        {
          id: 'Test',
          question: 'Example question',
          type: 'repeater',
          required: true,
        },
      ],
    },
  ],
};

export default form;
