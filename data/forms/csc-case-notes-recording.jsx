export default {
  title: '',
  path: '/form/csc-case-notes-recording/',
  steps: [
    {
      id: 'csc-case-notes-recording',
      title: 'CSC Case Notes Recording',
      components: [
        {
          component: 'Select',
          name: 'groupNoteType',
          label: 'Is this a group case note?',
          options: '',
        },
        {
          component: 'Select',
          name: 'serviceArea',
          label: 'Service Area',
          options: '',
        },
        {
          component: 'Select',
          name: 'unit',
          label: 'Unit',
          options: '',
        },
        {
          component: 'Select',
          name: 'cscCaseNoteType',
          label: 'What type of case note is this?',
          options: '',
        },
        {
          component: 'TextInput',
          name: 'cscOtherNoteType',
          width: '30',
          label: "if 'Other', please provide case note type",
          conditionalRender: ({ cscCaseNoteType }) =>
            cscCaseNoteType === 'Other',
        },
        {
          component: 'DateInput',
          name: 'dateOfEvent',
          label: 'Date of Event',
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'TextInput',
          name: 'cscCaseNoteTitle',
          width: '30',
          label: 'Case Note Title',
        },
        {
          component: 'TextArea',
          name: 'cscCaseNoteDescription',
          width: '30',
          label: 'Case Note Description',
        },
      ],
    },
  ],
};
