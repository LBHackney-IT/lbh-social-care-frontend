import { ReactNode } from 'react';
import Summary from 'components/Steps/Summary';
import Confirmation from 'components/Steps/Confirmation';
import { FormStep } from 'components/Form/types';
interface CustomStep {
  summary?: ReactNode;
  confirmation?: ReactNode;
}

interface Component {
  conditionalRender?: (arg0: Record<string, unknown>) => boolean;
  isMulti?: boolean;
  name: string;
  [key: string]: unknown;
}

interface Step {
  conditionalRender?: (arg0: Record<string, unknown>) => boolean;
  id: string;
  isMulti?: boolean;
  components?: Component[];
  [key: string]: unknown;
}

export const createSteps = (
  formSteps: Step[],
  customStep?: CustomStep
): Step[] => [
  ...formSteps,
  {
    id: 'summary',
    title: 'Summary',
    component: customStep?.summary || Summary,
  },
  {
    id: 'confirmation',
    title: 'Confirmation',
    component: customStep?.confirmation || Confirmation,
  },
];

export const getNextStepPath = (
  currentStepIndex: number,
  steps: Step[],
  formPath: string,
  formData: Record<string, unknown>
): string => {
  const nextStep = steps
    .slice(currentStepIndex + 1)
    .find((step) =>
      step.conditionalRender ? step.conditionalRender(formData) : true
    ) as { id: string };
  return `${formPath}${nextStep.id}`;
};

export const renderOnCondition = (
  step: FormStep,
  data: Record<string, unknown>,
  component: ReactNode
): ReactNode | null =>
  step.conditionalRender && !step.conditionalRender(data) ? null : component;

export const filterStepsOnCondition = (
  steps: Step[],
  data: Record<string, unknown>
): Step[] =>
  steps.filter(
    (step) => !step.conditionalRender || step.conditionalRender(data)
  );

export const filterDataOnCondition = (
  steps: Step[],
  data: Record<string, unknown>
): Record<string, unknown> => {
  const isValidValue = filterStepsOnCondition(steps, data).reduce(
    (acc: Array<string>, step: Step) =>
      step.components
        ? [
            ...acc,
            ...step.components
              .filter(
                (component) =>
                  !component.conditionalRender ||
                  component.conditionalRender(data)
              )
              .map((component: Component): string =>
                step.isMulti ? step.id : component.name
              ),
          ]
        : acc,
    []
  );
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => isValidValue.includes(key))
  );
};

export const haveStepsChanged = (
  steps: Step[],
  beforeData: Record<string, unknown>,
  afterData: Record<string, unknown>
): boolean => {
  const stepsBefore = filterStepsOnCondition(steps, beforeData).map(
    (step) => step.id
  );
  const stepsAfter = filterStepsOnCondition(steps, afterData).map(
    (step) => step.id
  );
  return JSON.stringify(stepsBefore) !== JSON.stringify(stepsAfter);
};
