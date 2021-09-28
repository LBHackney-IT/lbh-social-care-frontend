import { Form } from '../forms.types';
import { format } from 'date-fns';

const form: Form = {
  id: 'case-status-edit',
  name: 'Edit/end case status',
  groupRecordable: false,
  isViewableByAdults: false,
  isViewableByChildrens: true,

  steps: [
    {
      id: 'editCINCaseStatus',
      name: 'Edit a status',
      theme: 'Case status',
      fields: [
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'notes',
          question: 'Notes',
          type: 'textarea',
          required: false,
        },
      ],
    },
    {
      id: 'editCPCaseStatus',
      name: 'Edit a status',
      theme: 'Case status',
      fields: [
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'category',
          question: 'Category of child protection plan',
          type: 'radios',
          choices: [
            {
              value: 'C1',
              label: 'Neglect',
            },
            {
              value: 'C2',
              label: 'Physical abuse',
            },
            {
              value: 'C3',
              label: 'Emotional abuse',
            },
            {
              value: 'C4',
              label: 'Sexual abuse',
            },
          ],
          required: false,
        },
      ],
    },
    {
      id: 'editLACCaseStatus',
      name: 'Edit a status',
      theme: 'Case status',
      fields: [
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'legalStatus',
          question: "What is the child's legal status?",
          type: 'select',
          choices: [
            {
              value: 'V4',
              label:
                'V4: Accommodated under an agreed series of short-term breaks, when agreements are recorded (ie NOT individual episods of care)',
            },
            {
              value: 'V3',
              label:
                'V3: Accomodated under an agreed series of short-term breaks, when individual episodes of care are recorded',
            },
            {
              value: 'J2',
              label: 'J2: Detained in LA accomodation and PACE',
            },
            {
              value: 'L2',
              label: 'L2: Emergency protection order',
            },
            {
              value: 'D1',
              label: 'D1: Freeing order granted',
            },
            {
              value: 'C2',
              label: 'C2: Full care order',
            },
            {
              value: 'C1',
              label: 'C1: Interim care order',
            },
            {
              value: 'J1',
              label:
                'J1: On remand, or committed for tiral or sentence, and accomodated by LA',
            },
            {
              value: 'E1',
              label: 'E1: Placement order granted',
            },
            {
              value: 'J3',
              label:
                'J3: Sentencted to CYPA 1969 supervision order with residence requirement',
            },
            {
              value: 'V2',
              label: 'V2: Single period of accomodation under section 20',
            },
            {
              value: 'L3',
              label:
                'L3: Under child assessment order and in local authority accomodation',
            },
            {
              value: 'L1',
              label:
                'L1: Under police protection and in local authority accomodation',
            },
            {
              value: 'W1',
              label:
                'W1: Wardship granted in High Court and child in LA accomodation',
            },
          ],
          required: false,
        },
        {
          id: 'placementReason',
          question: "What is the child's placement reason?",
          type: 'select',
          choices: [
            {
              value: 'S1',
              label:
                'S1: All residential schools, except where dual-registered as a school',
            },
            {
              value: 'T0',
              label: 'T0: All types of temprary move',
            },
            {
              value: 'R3',
              label: 'R3: Family centre or mother and baby unit',
            },
            {
              value: 'U2',
              label:
                'U2: Foster placement with relative or friend who is also an approved adopter - FFA',
            },
            {
              value: 'U1',
              label:
                'U1: Foster placement with relative or friend - long term fostering',
            },
            {
              value: 'U3',
              label:
                'U3: Foster placement with relative or friend - not long term of FFA',
            },
            {
              value: 'K2',
              label: 'K2: Homes and hostels',
            },
            {
              value: 'P2',
              label:
                'P2: Independent living, e.g. in flat or lodgings, bedsit, B&B or with friends, with or without formal support staff',
            },
            {
              value: 'R2',
              label:
                'R2: NHS/health Trust or other enstablishment providing medical or nursing care',
            },
            {
              value: 'Z1',
              label:
                'Z1: Other placements (must be listed on a schedule sent to DH with annual submission)',
            },
          ],
        },
      ],
    },
  ],
};
export default form;
