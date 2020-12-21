import CASE_NOTE_TYPES from 'data/caseNoteTypes';
export default {
  path: '/form/case-notes-recording/',
  steps: [
    {
      id: 'case-notes-recording',
      title: 'Case notes recording',
      components: [
        {
          component: 'Select',
          name: 'form_name',
          label: 'Case Note Type',
          options: CASE_NOTE_TYPES,
        },
        {
          component: 'TextInput',
          name: 'other_form_name',
          width: '30',
          label: "if 'Other', please provide case note type",
          conditionalRender: ({ form_name }) => form_name === 'Other',
        },
        {
          component: 'DateInput',
          name: 'date_of_event',
          label: 'Date of Event',
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'TextInput',
          name: 'case_note_title',
          width: '30',
          label: 'Case Note Title',
        },
        {
          component: 'TextArea',
          name: 'case_note_description',
          width: '30',
          label: 'Case Note Description',
        },
      ],
    },
  ],
};
