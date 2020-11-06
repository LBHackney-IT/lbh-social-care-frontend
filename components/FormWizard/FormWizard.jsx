import { useState, useCallback } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

const FormWizard = ({ formPath, formSteps, title }) => {
  Router.events.on('routeChangeComplete', () => {
    window.scrollTo(0, 0);
  });
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const { stepId } = router.query;
  const stepPath = `${formPath}[step]`;
  const step = formSteps.find(({ id }) => id === stepId);
  if (!step) {
    return null;
  }
  const getAdjacentSteps = useCallback((currentStepIndex) => {
    return {
      previousStep:
        currentStepIndex > 0
          ? `${formPath}${formSteps[currentStepIndex - 1].id}`
          : null,
      nextStep:
        currentStepIndex < formSteps.length - 1
          ? `${formPath}${formSteps[currentStepIndex + 1].id}`
          : null,
    };
  });
  const StepComponent = step.component;
  const currentStepIndex = formSteps.findIndex(({ id }) => id === step.id);
  const { previousStep, nextStep } = getAdjacentSteps(currentStepIndex);
  return (
    <div className="govuk-width-container">
      {previousStep && (
        <Link href={stepPath} as={previousStep}>
          <a className="govuk-back-link">Back</a>
        </Link>
      )}
      <fieldset
        className="govuk-fieldset"
        role="group"
        aria-describedby="step-hint"
      >
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 className="govuk-fieldset__heading">{title}</h1>
        </legend>
        <div className="govuk-breadcrumbs">
          <ol className="govuk-breadcrumbs__list">
            {formSteps.map((step, index) => (
              <Breadcrumbs
                key={step.id}
                label={step.title}
                link={`/form/adult-referral/${step.id}`}
                state={
                  currentStepIndex === index
                    ? 'current'
                    : currentStepIndex < index && 'completed'
                }
              />
            ))}
          </ol>
        </div>
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h1 className="govuk-fieldset__heading">{step.title}</h1>
        </legend>
        <StepComponent
          formData={formData}
          saveData={(data) => setFormData({ ...formData, ...data })}
          nextStep={nextStep}
          stepPath={stepPath}
        />
      </fieldset>
    </div>
  );
};

export default FormWizard;
