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
        name: 'reviewDiscussion',
        label: 'Have you discussed this review with the individual',
        isRadiosInline: true,
        rules: { required: true },
        conditionalRender: ({ person }) => person.ageContext === 'A',
      },
      {
        component: 'TextArea',
        name: 'reviewDetails',
        label: 'Details of review',
        hint:
          'include details of disclosure to individual, any updates and why renewing or ending',
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
        rules: { required: true },
      },
      {
        component: 'DateInput',
        name: 'discussedWithManagerDate',
        label: 'Date discussed with manager',
        rules: { required: true },
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
          required: true,
          validate: {
            beforeStartDate: (value, { reviewDate }) =>
              new Date(value).getTime() >= new Date(reviewDate).getTime() ||
              'Next review date cannot be earlier than date review undertaken',
            notMoreThanOneYear: (value, { reviewDate }) =>
              new Date(value).getTime() - new Date(reviewDate).getTime() <=
                365 * 24 * 60 * 60 * 1000 ||
              'Next review date cannot be more than 1 year from date review undertaken',
          },
        },
        showConditionalGuides: true,
        hint:
          'Next review date cannot be more than 1 year from date review undertaken ',
        conditionalRender: ({ reviewDecision }) => reviewDecision === 'Yes',
      },
    ],
  },
];

export default formSteps;
