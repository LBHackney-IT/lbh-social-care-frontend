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

export const filterConditionalSteps = (steps, data) =>
  steps.filter(
    (step) => step.conditionalRender && !step.conditionalRender(data)
  );

export const filterDataOnCondition = (steps, data) => {
  const toFilterOut = filterConditionalSteps(steps, data).reduce(
    (acc, step) => [
      ...acc,
      ...step.components.map((component) => component.name),
    ],
    []
  );
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !toFilterOut.includes(key))
  );
};

export const haveStepsChanged = (steps, beforeData, afterData) => {
  const stepsBefore = filterConditionalSteps(steps, beforeData).map(
    (step) => step.id
  );
  const stepsAfter = filterConditionalSteps(steps, afterData).map(
    (step) => step.id
  );
  return JSON.stringify(stepsBefore) !== JSON.stringify(stepsAfter);
};
