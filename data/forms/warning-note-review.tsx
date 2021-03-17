import { FormStep } from 'components/Form/types';

const formSteps: FormStep[] = [
  {
    id: 'review-warning-note',
    title: 'Warning Note Review',
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
      <span className="govuk-caption-l">
        This Warning Note review has been discussed and agreed by the manager
        named below
      </span>,
      {
        component: 'TextInput',
        name: 'discussedWithManager',
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
        isRadiosInline: true,
      },
      {
        component: 'DateInput',
        name: 'nextReviewDate',
        label: 'Next review date',
        hint:
          'Next review date cannot be more than 1 year from date review undertaken ',
        conditionalRender: ({ reviewDecision }) => reviewDecision === 'Yes',
      },
    ],
  },
];

export default formSteps;
