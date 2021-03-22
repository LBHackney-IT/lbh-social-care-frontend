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
        rules: { required: true },
      },
      {
        component: 'TextInput',
        name: 'other_form_name',
        width: 30,
        label: "if 'Other', please provide case note type",
        conditionalRender: ({ form_name }) => form_name === 'Other',
        rules: { required: true },
      },
      {
        component: 'DateInput',
        name: 'date_of_event',
        label: 'Date of Event',
        hint: 'For example, 31 03 1980',
        rules: { required: true },
      },
      {
        component: 'TextInput',
        name: 'case_note_title',
        width: 30,
        label: 'Case Note Title',
        rules: { required: true },
      },
      {
        component: 'TextArea',
        name: 'case_note_description',
        width: 30,
        label: 'Case Note Description',
        rules: { required: true },
      },
    ],
  },
];

export default formSteps;
