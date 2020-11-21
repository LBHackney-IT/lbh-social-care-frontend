import Summary from 'components/Steps/Summary';
import Confirmation from 'components/Steps/Confirmation';

export const createSteps = (formSteps) => [
  ...formSteps,
  { id: 'summary', title: 'Summary', component: Summary },
  { id: 'confirmation', title: 'Confirmation', component: Confirmation },
];

export const getNextStepPath = (
  currentStepIndex,
  steps,
  formPath,
  formData
) => {
  const nextStep = steps
    .slice(currentStepIndex + 1)
    .find((step) =>
      step.conditionalRender ? step.conditionalRender(formData) : true
    );
  return `${formPath}${nextStep.id}`;
};

export const renderOnCondition = (step, data, component) =>
  step.conditionalRender && !step.conditionalRender(data) ? null : component;
