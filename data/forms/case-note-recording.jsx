// import CASE_NOTE_TYPES from 'data/caseNoteTypes';
export default {
  title: 'Add a new case note for',
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
          // options: { CASE_NOTE_TYPES },
        },
        {
          component: 'TextInput',
          name: 'otherNoteType',
          width: '30',
          label: "if 'Other', please provide case note type",
        },
        {
          component: 'DateInput',
          control: 'control',
          name: 'dateOfEvent',
          label: 'Date of Event',
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'TextInput',
          name: 'caseNoteDescription',
          width: '30',
          label: 'Case Note Title',
        },
        {
          component: 'TextInput',
          name: 'caseNoteDescription',
          width: '30',
          labelSize: 'l',
          label: 'Case Note Title',
        },
      ],
    },
  ],
};
