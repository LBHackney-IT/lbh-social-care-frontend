import { FormComponentStep, FormStep } from 'components/Form/types';

const REVIEW_UNDERTAKEN_DATE: Array<FormComponentStep> = [
  {
    component: 'DateInput',
    name: 'reviewDate',
    label: 'Date review undertaken',
    rules: {
      required: true,
      validate: {
        notInFuture: (value) =>
          new Date(value).getTime() <= new Date().getTime() ||
          "Date review undertaken can't be in the future",
      },
    },
  },
];

const REVIEW_DISCLOSURE: Array<FormComponentStep> = [
  {
    component: 'Radios',
    name: 'disclosedWithIndividual',
    label: 'Have you discussed this review with the individual',
    rules: { required: 'Select an answer for this input' },
  },
];

const REVIEW_DETAILS: Array<FormComponentStep> = [
  {
    component: 'TextArea',
    name: 'reviewNotes',
    label: 'Details of review',
    hint: 'include details of disclosure to individual, any updates and why renewing or ending',
    rules: { required: true },
  },
];

// This is optional on an adults form
const REVIEW_DISCUSSED_WITH_MANAGER_ADULTS: Array<FormComponentStep> = [
  <h3 key="manager review discussion">Review discussed with manager</h3>,
  <span key="manager review caption" className="govuk-caption-m">
    This Warning Note review has been discussed and agreed by the manager named
    below
  </span>,
  {
    component: 'TextInput',
    name: 'managerName',
    label: 'Manager’s name',
  },
  {
    component: 'DateInput',
    name: 'discussedWithManagerDate',
    label: 'Date discussed with manager',
    rules: {
      validate: {
        notInFuture: (value) =>
          new Date(value).getTime() <= new Date().getTime() ||
          "Date discussed with manager can't be in the future",
      },
    },
  },
];

const REVIEW_DISCUSSED_WITH_MANAGER_CHILDREN: Array<FormComponentStep> = [
  <h3 key="manager review discussion">Review discussed with manager</h3>,
  <span key="manager review caption" className="govuk-caption-m">
    This Warning Note review has been discussed and agreed by the manager named
    below
  </span>,
  {
    component: 'TextInput',
    name: 'managerName',
    label: 'Manager’s name',
    rules: { required: true },
  },
  {
    component: 'DateInput',
    name: 'discussedWithManagerDate',
    label: 'Date discussed with manager',
    rules: {
      required: true,
      validate: {
        notInFuture: (value) =>
          new Date(value).getTime() <= new Date().getTime() ||
          "Date discussed with manager can't be in the future",
      },
    },
  },
];

const REVIEW_DECISION: Array<FormComponentStep> = [
  <h3 key="next steps">Next steps</h3>,
  {
    component: 'Radios',
    name: 'reviewDecision',
    label: 'What do you want to do?',
    rules: {
      required: 'Select what you want to do',
    },
    options: [
      { value: 'Yes', text: 'Renew Warning Note' },
      { value: 'No', text: 'End Warning Note' },
    ],
  },
];

const NEXT_REVIEW_DETAILS: Array<FormComponentStep> = [
  {
    component: 'DateInput',
    name: 'nextReviewDate',
    label: 'Next review date',
    rules: {
      required: true,
      validate: {
        beforeStartDate: (value) =>
          new Date(value).getTime() >= new Date().getTime() ||
          'Next review date cannot be earlier than today.',
        notMoreThanOneYear: (value, { reviewDate }) =>
          new Date(value).getTime() - new Date(reviewDate).getTime() <=
            365 * 24 * 60 * 60 * 1000 ||
          'Next review date cannot be more than 1 year from date review undertaken.',
      },
    },
    showConditionalGuides: true,
    hint: 'Next review date cannot be more than 1 year from date review undertaken. ',
    conditionalRender: ({ reviewDecision, outputAsDetailedSummary }) =>
      reviewDecision === 'Yes' || outputAsDetailedSummary === 'Yes',
  },
];

const DETAILS_FOR_SUMMARY_VIEW: Array<FormComponentStep> = [
  {
    component: 'DateInput',
    name: 'endDate',
    label: 'End Date',
    conditionalRender: ({ outputAsDetailedSummary }) =>
      outputAsDetailedSummary === 'Yes',
  },
  {
    component: 'TextInput',
    name: 'lastModifiedBy',
    label: 'Review done by',
    conditionalRender: ({ outputAsDetailedSummary }) =>
      outputAsDetailedSummary === 'Yes',
  },
];

export const reviewFormStepsAdult: FormStep[] = [
  {
    id: 'review-warning-note',
    title: 'Warning Review Details',
    components: [
      ...REVIEW_UNDERTAKEN_DATE,
      ...REVIEW_DISCLOSURE,
      ...REVIEW_DETAILS,
      ...REVIEW_DISCUSSED_WITH_MANAGER_ADULTS,
      ...REVIEW_DECISION,
      ...NEXT_REVIEW_DETAILS,
      ...DETAILS_FOR_SUMMARY_VIEW,
    ],
  },
];

export const reviewFormStepsChild: FormStep[] = [
  {
    id: 'review-warning-note',
    title: 'Warning Review Details',
    components: [
      ...REVIEW_UNDERTAKEN_DATE,
      ...REVIEW_DETAILS,
      ...REVIEW_DISCUSSED_WITH_MANAGER_CHILDREN,
      ...REVIEW_DECISION,
      ...NEXT_REVIEW_DETAILS,
      ...DETAILS_FOR_SUMMARY_VIEW,
    ],
  },
];
