import { FormStep, Option, Options } from 'components/Form/types';
import { Resident } from 'types';

const formSteps = (
  relationshipTypeOptions: Options,
  secondPerson: Resident
): FormStep[] => {
  return [
    {
      id: 'add-relationship',
      title: 'Add Relationship',
      components: [
        <h1
          key="subtitle-details"
          className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
        >
          Add new relationship
        </h1>,
        <h2
          className="lbh-heading-h2 lbh-!-font-weight-light"
          key="define-relationship-for"
        >
          Define a relationship for
        </h2>,
        <h3 className="lbh-heading-h3" key="selected-person-name">
          {`${secondPerson.firstName} ${secondPerson.lastName}`}
        </h3>,
        {
          component: 'Select',
          placeHolder: 'Relationship type',
          name: 'type',
          label: 'Relationship type',
          labelSize: 's',
          width: 20,
          rules: { required: true },
          options: relationshipTypeOptions,
        },
        {
          conditionalRender: ({ type }) =>
            type !== 'unbornSibling' &&
            type !== 'unbornChild' &&
            type !== '' &&
            type !== undefined,
          component: 'Checkbox',
          name: 'additionalOptions',
          label: 'Select all that apply',
          labelSize: 's',
          options: ({ type }) => {
            const typeOptions: Option[] = [
              { value: 'isMainCarer', text: 'Is a main carer' },
            ];

            if (type === 'parent') {
              typeOptions.push({
                value: 'isParentOfUnbornChild',
                text: 'Parent of an unborn child',
              });
            }
            if (type === 'sibling') {
              typeOptions.push({
                value: 'isSiblingOfUnbornChild',
                text: 'Sibling of an unborn child',
              });
            }

            return typeOptions;
          },
        },
        {
          component: 'TextInput',
          name: 'details',
          width: 20,
          label: 'Details',
          rules: { required: false },
        },
      ],
    },
  ];
};

export default formSteps;
