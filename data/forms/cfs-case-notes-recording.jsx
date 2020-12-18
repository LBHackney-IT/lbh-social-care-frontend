import CFS_SERVICE_AREAS from 'data/cfsServiceAreas';
import UNIT_FP from 'data/unitFP';
import UNIT_AA from 'data/unitAA';
import UNIT_CIN from 'data/unitCIN';
import UNIT_DCS from 'data/unitDCS';
import UNIT_FSS from 'data/unitFSS';
import UNIT_LAC from 'data/unitLAC';
import UNIT_LC from 'data/unitLC';
import UNIT_SL from 'data/unitSL';
import UNIT_YH from 'data/unitYH';
import CFS_CASE_NOTE from 'data/cfsCaseNoteTypes';

export default {
  title: '',
  path: '/form/cfs-case-notes-recording/',
  steps: [
    {
      id: 'cfs-case-notes-recording',
      title: 'CFS Case Notes Recording',
      components: [
        {
          component: 'Select',
          name: 'serviceAreaType',
          label: 'Is this a group case note?',
          options: ['Yes', 'No'],
        },
        {
          component: 'Select',
          name: 'serviceArea',
          label: 'Service Areas',
          options: CFS_SERVICE_AREAS,
        },
        {
          component: 'Select',
          name: 'unitAA',
          label: 'Unit - A&A',
          options: UNIT_AA,

          conditionalRender: ({ serviceArea }) => serviceArea === 'A&A',
        },
        {
          component: 'Select',
          name: 'unitCIN',
          label: 'Unit - CIN',
          options: UNIT_CIN,
          conditionalRender: ({ serviceArea }) => serviceArea === 'CIN',
        },
        {
          component: 'Select',
          name: 'unitCS',
          label: 'Unit - Clinical Services',
          options: ['CFS Management'],
          conditionalRender: ({ serviceArea }) =>
            serviceArea === 'Clinical Services',
        },
        {
          component: 'Select',
          name: 'unitDCS',
          label: 'Unit - DCS and short breaks service',
          options: UNIT_DCS,
          conditionalRender: ({ serviceArea }) =>
            serviceArea === 'DCS and short breaks service',
        },
        {
          component: 'Select',
          name: 'unitDAIS',
          label: 'Unit - Domestic Abuse Intervention Service',
          options: ['Domestic Abuse Intervention Service'],
          conditionalRender: ({ serviceArea }) =>
            serviceArea === 'Domestic Abuse Intervention Service',
        },
        {
          component: 'Select',
          name: 'unitFSS',
          label: 'Unit - Family support service',
          options: UNIT_FSS,
          conditionalRender: ({ serviceArea }) =>
            serviceArea === 'Family support service',
        },
        {
          component: 'Select',
          name: 'unitFP',
          label: 'Unit - Fostering and placement',
          options: UNIT_FP,
          conditionalRender: ({ serviceArea }) =>
            serviceArea === 'Fostering and placement',
        },
        {
          component: 'Select',
          name: 'unitLAC',
          label: 'Unit - LAC',
          options: UNIT_LAC,
          conditionalRender: ({ serviceArea }) => serviceArea === 'LAC',
        },
        {
          component: 'Select',
          name: 'unitLC',
          label: 'Unit - Leaving Care',
          options: UNIT_LC,
          conditionalRender: ({ serviceArea }) =>
            serviceArea === 'Leaving Care',
        },
        {
          component: 'Select',
          name: 'unitNPRF',
          label: 'Unit - NPRF and PF service',
          options: ['NRPF and private fostering unit', 'CFS Management'],
          conditionalRender: ({ serviceArea }) =>
            serviceArea === 'NRPF and PF service',
        },
        {
          component: 'Select',
          name: 'unitSL',
          label: 'Unit - Safeguarding and Learning',
          options: UNIT_SL,
          conditionalRender: ({ serviceArea }) =>
            serviceArea === 'Safeguarding and Learning',
        },
        {
          component: 'Select',
          name: 'unitYH',
          label: 'Unit - Young Hackney',
          options: UNIT_YH,
          conditionalRender: ({ serviceArea }) =>
            serviceArea === 'Young Hackney',
        },
        {
          component: 'Select',
          name: 'cfsCaseNoteType',
          label: 'What type of case note is this?',
          options: CFS_CASE_NOTE,
        },
        {
          component: 'TextInput',
          name: 'cfsOtherNoteType',
          width: '30',
          label: "if 'Other', please provide case note type",
          conditionalRender: ({ cfsCaseNoteType }) =>
            cfsCaseNoteType === 'Other',
        },
        {
          component: 'DateInput',
          name: 'dateOfEvent',
          label: 'Date of Event',
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'TextInput',
          name: 'cfsCaseNoteTitle',
          width: '30',
          label: 'Case Note Title',
        },
        {
          component: 'TextArea',
          name: 'cfsCaseNoteDescription',
          width: '30',
          label: 'Case Note Description',
        },
      ],
    },
  ],
};
