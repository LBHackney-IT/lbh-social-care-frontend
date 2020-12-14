import CASE_NOTE_TYPES from 'data/caseNoteTypes';
export default {
  title: '',
  path: '/form/case-notes-recording/',
  steps: [
    {
      id: 'case-notes-recording',
      title: 'case-notes-recording',

      components: [
        {
          component: 'Select',
          name: 'caseNoteType',
          label: 'Case Note Type',
          options: CASE_NOTE_TYPES,
        },
        {
          component: 'TextInput',
          name: 'otherNoteType',
          width: '30',
          label: "if 'Other', please provide case note type",
          conditionalRender: ({ caseNoteType }) => caseNoteType === 'Other',
        },
        {
          component: 'DateInput',
          name: 'dateOfEvent',
          label: 'Date of Event',
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'TextInput',
          name: 'caseNoteTitle',
          width: '30',
          label: 'Case Note Title',
        },
        {
          component: 'TextArea',
          name: 'caseNoteDescription',
          width: 80,
          labelSize: 'm',
          label: 'Case Note Description',
        },
      ],
    },
  ],
};
