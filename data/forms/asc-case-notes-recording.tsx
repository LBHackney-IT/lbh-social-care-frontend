import { FormStep } from 'components/Form/types';
import FORM_NAMES from 'data/formNames';

const formSteps: FormStep[] = [
  {
    id: 'case-notes-recording',
    title: 'Case notes recording',
    components: [
      {
        component: 'Select',
        name: 'form_name',
        label: 'Case Note Type',
        options: FORM_NAMES,
        rules: { required: 'Select a form from the menu.' },
      },
      {
        component: 'TextInput',
        name: 'other_form_name',
        width: 30,
        label: "if 'Other', please provide case note type",
        conditionalRender: ({ form_name }) => form_name === 'Other',
        rules: { required: 'Please provide a case note type' },
      },
      {
        component: 'DatePicker',
        name: 'date_of_event',
        label: 'Date of Event',
        hint: 'For example, 31 03 1980',
        rules: { required: 'Please provide a valid date.' },
      },
      {
        component: 'TextInput',
        name: 'case_note_title',
        width: 30,
        label: 'Case Note Title',
        rules: { required: 'Please provide a case note title.' },
      },
      {
        component: 'TextArea',
        name: 'case_note_description',
        width: 30,
        label: 'Case Note Description',
        rules: { required: 'Please add a case note description.' },
      },
    ],
  },
];

export default formSteps;
