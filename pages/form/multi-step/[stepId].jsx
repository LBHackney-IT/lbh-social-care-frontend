import FormWizard from 'components/FormWizard/FormWizard';

const form = {
  title: 'Create New Record',
  path: '/form/multi-step/',
  steps: [
    {
      id: 'step-a',
      title: 'Step A',
      components: [
        {
          component: 'ConditionalComponent',
          name: 'test',
          label: 'Flavours of ice cream?',
          options: ['Vanilla', 'Strawberry', 'Chocolate', 'Car', 'Boat'],
        },
        {
          component: 'TextInput',
          conditional: (test) =>
            ['Vanilla', 'Strawberry', 'Chocolate'].includes(test),
          conditionalName: 'test',
          name: 'food',
          width: '30',
          label: 'Best dessert?',
          hint: 'For example apple pie',
        },
      ],
    },
    {
      id: 'step-b',
      title: 'Step B',
      components: [
        {
          component: 'TextInput',
          name: 'mosaic_c',
          width: '30',
          label: 'Mosaic ID Number',
          hint: 'For example 0123456789',
          rules: { required: true },
        },
      ],
    },
  ],
};

const AdultReferral = () => {
  const onFormSubmit = (formData) => console.log(formData);
  return (
    <FormWizard
      formPath={form.path}
      formSteps={form.steps}
      title={form.title}
      defaultValues={form.defaultValues}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default AdultReferral;
