import { FormStep } from 'components/Form/types';

const formSteps: FormStep[] = [
  {
    id: 'review-warning-note',
    title: 'Warning Review Details',
    components: [
      {
        component: 'DateInput',
        name: 'reviewDate',
        label: 'Date review undertaken',
        rules: { required: true },
      },
      {
        component: 'Radios',
        name: 'disclosedWithIndividual',
        label: 'Have you discussed this review with the individual',
        isRadiosInline: true,
        rules: { required: true },
        conditionalRender: ({ person }) => person.ageContext === 'A',
      },
      {
        component: 'TextArea',
        name: 'notes',
        label: 'Details of review',
        hint: 'include details of disclosure to individual, any updates and why renewing or ending',
        rules: { required: true },
      },
      <h2 key="manager review discussion">Review discussed with manager</h2>,
      <span key="manager review caption" className="govuk-caption-l">
        This Warning Note review has been discussed and agreed by the manager
        named below
      </span>,
      {
        component: 'TextInput',
        name: 'managerName',
        label: 'Manager’s name',
        rules: { required: "Add the manager's name." },
      },
      {
        component: 'DateInput',
        name: 'discussedWithManagerDate',
        label: 'Date discussed with manager',
        rules: { required: 'Pease add a valid date.' },
      },
      {
        component: 'Radios',
        name: 'reviewDecision',
        label: 'What do you want to do?',
        rules: { required: true },
        options: [
          { value: 'Yes', text: 'Renew Warning Note' },
          { value: 'No', text: 'End Warning Note' },
        ],
      },
      {
        component: 'DateInput',
        name: 'nextReviewDate',
        label: 'Next review date',
        rules: {
          required: 'Pease add a valid date.',
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
    ],
  },
];

export default formSteps;
