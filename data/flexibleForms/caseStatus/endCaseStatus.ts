import { Form, Choice } from '../forms.types';
import { format } from 'date-fns';
import { LACReasonsForEpisodeEndOptions } from 'types';

const lac_placement_reason_options: Choice[] = [];

Object.keys(LACReasonsForEpisodeEndOptions).map((key) => {
  lac_placement_reason_options.push({
    value: key,
    label:
      LACReasonsForEpisodeEndOptions[
        key as keyof typeof LACReasonsForEpisodeEndOptions
      ],
  });
});

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
          choices: lac_placement_reason_options,
        },
      ],
    },
  ],
};
export default form;
