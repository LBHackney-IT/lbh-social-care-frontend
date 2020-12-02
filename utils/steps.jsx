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

export const filterStepsOnCondition = (steps, data) =>
  steps.filter(
    (step) => !step.conditionalRender || step.conditionalRender(data)
  );

export const filterDataOnCondition = (steps, data) => {
  const isValidValue = filterStepsOnCondition(steps, data).reduce(
    (acc, step) => [
      ...acc,
      ...step.components
        .filter(
          (component) =>
            !component.conditionalRender || component.conditionalRender(data)
        )
        .map((component) => component.name),
    ],
    []
  );
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => isValidValue.includes(key))
  );
};

export const haveStepsChanged = (steps, beforeData, afterData) => {
  const stepsBefore = filterStepsOnCondition(steps, beforeData).map(
    (step) => step.id
  );
  const stepsAfter = filterStepsOnCondition(steps, afterData).map(
    (step) => step.id
  );
  return JSON.stringify(stepsBefore) !== JSON.stringify(stepsAfter);
};
