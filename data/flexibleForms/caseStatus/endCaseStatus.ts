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
      id: 'endCaseStatus',
      name: 'End a status',
      theme: 'Case status',
      fields: [
        {
          id: 'endDate',
          question: 'End Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
        },
      ],
    },
    {
      id: 'endLACCaseStatus',
      name: 'End a status',
      theme: 'Case status',
      fields: [
        {
          id: 'endDate',
          question: 'End Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
        },
        {
          id: 'episodeReason',
          question: 'What is the reason for the episode ending?',
          type: 'select',
          required: true,
          choices: [
            {
              value: 'X1',
              label:
                'X1: Episode ceases, and new episode begins on same day, for any reason',
            },
            {
              value: 'E11',
              label:
                'E11: Adopted - application for an adoption order unopposed ',
            },
            {
              value: 'E12',
              label: 'E12: Adopted – consent dispensed with by the court',
            },
            {
              value: 'E2',
              label: 'E2: Died',
            },
            {
              value: 'E3',
              label: 'E3: Care taken over by another local authority in the UK',
            },
            {
              value: 'E4A',
              label:
                'E4A: Returned home to live with parent(s), relative(s), or other person(s) with parental responsibility as part of the care planning process (not under a special guardianship order or residence order or (from 22 April 2014) a child arrangement order).',
            },
            {
              value: 'E4B',
              label:
                'E4B: Returned home to live with parent(s), relative(s), or other person(s) with parental responsibility which was not part of the current care planning process (not under a special guardianship order or residence order or (from 22 April 2014) a child arrangement order).',
            },
            {
              value: 'E13',
              label:
                'E13: Left care to live with parent(s), relative(s), or other person(s) with no parental responsibility.',
            },
            {
              value: 'E41',
              label:
                'E41: Residence order (or, from 22 April 2014, a child arrangement order which sets out with whom the child is to live) granted',
            },
            {
              value: 'E45',
              label:
                'E45: Special guardianship order made to former foster carer(s), who was/are a relative(s) or friend(s)',
            },
            {
              value: 'E46',
              label:
                'E46: Special guardianship order made to former foster carer(s), other than relative(s) or friend(s) ',
            },
            {
              value: 'E47',
              label:
                'E47: Special guardianship order made to carer(s), other than former foster carer(s), who was/are a relative(s) or friend(s)',
            },
            {
              value: 'E48',
              label:
                'E48: Special guardianship order made to carer(s), other than former foster carer(s), other than relative(s) or friend(s) ',
            },
            {
              value: 'E5',
              label:
                'E5: Moved into independent living arrangement and no longer looked-after: supportive accommodation providing formalised advice/support arrangements (such as most hostels, young men’s Christian association, foyers, staying close and care leavers projects). Includes both children leaving care before and at age 18 ',
            },
            {
              value: 'E6',
              label:
                'E6: Moved into independent living arrangement and no longer looked-after : accommodation providing no formalised advice/support arrangements (such as bedsit, own flat, living with friend(s)). Includes both children leaving care before and at age 18 ',
            },
            {
              value: 'E7',
              label:
                'E7: Transferred to residential care funded by adult social care services ',
            },
            {
              value: 'E9',
              label: 'E9: Sentenced to custody ',
            },
            {
              value: 'E15',
              label:
                'E15: Age assessment determined child is aged 18 or over and E5, E6 and E7 do not apply, such as an unaccompanied asylum-seeking child (UASC) whose age has been disputed ',
            },
            {
              value: 'E16',
              label: 'E16: Child moved abroad ',
            },
            {
              value: 'E17',
              label:
                'E17: Aged 18 (or over) and remained with current carers (inc under staying put arrangements) ',
            },
            {
              value: 'E8',
              label:
                'E8: Period of being looked-after ceased for any other reason (where none of the other reasons apply)',
            },
          ],
        },
      ],
    },
  ],
};
export default form;
