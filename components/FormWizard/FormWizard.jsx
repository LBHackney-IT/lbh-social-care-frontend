import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useBeforeunload } from 'react-beforeunload';

import DynamicStep from 'components/DynamicStep/DynamicStep';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { getData, saveData } from 'utils/saveData';
import Summary from 'components/Steps/Summary';
import Confirmation from 'components/Steps/Confirmation';

const FormWizard = ({
  formPath,
  formSteps,
  onFormSubmit,
  defaultValues = {},
  title,
}) => {
  Router.events.on('routeChangeComplete', () => {
    window.scrollTo(0, 0);
  });

  const [formData, setFormData] = useState(defaultValues);

  const steps = [
    ...formSteps,
    { id: 'summary', title: 'Summary', component: Summary },
    { id: 'confirmation', title: 'Confirmation', component: Confirmation },
  ];

  const router = useRouter();
  useBeforeunload(() => "You'll lose your data!");
  const { stepId, fromSummary, continueForm } = router.query;
  const stepPath = `${formPath}[step]`;
  const step = steps.find(({ id }) => id === stepId);
  if (!step) {
    return null;
  }

  const getAdjacentSteps = useCallback((currentStepIndex) => {
    return {
      previousStep:
        currentStepIndex > 0
          ? `${formPath}${steps[currentStepIndex - 1].id}`
          : null,
      nextStep:
        currentStepIndex < steps.length - 1
          ? `${formPath}${steps[currentStepIndex + 1].id}`
          : null,
    };
  });

  const StepComponent = step.component ? step.component : DynamicStep;
  const currentStepIndex = steps.findIndex(({ id }) => id === step.id);
  const { previousStep, nextStep } = getAdjacentSteps(currentStepIndex);
  const savedData = getData(formPath) || {};

  return (
    <div className="govuk-width-container">
      <NextSeo title={`${step.title} - ${title}`} noindex={true} />
      {previousStep && step.id !== 'confirmation' && (
        <Link href={stepPath} as={previousStep}>
          <a className="govuk-back-link">Back</a>
        </Link>
      )}
      <fieldset
        className="govuk-fieldset"
        role="group"
        aria-describedby="step-hint"
      >
        {step.id !== 'confirmation' && (
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">{title}</h1>
          </legend>
        )}
        {step.id !== 'summary' && step.id !== 'confirmation' && (
          <>
            <div className="govuk-breadcrumbs">
              <ol className="govuk-breadcrumbs__list">
                {formSteps.map((step, index) => (
                  <Breadcrumbs
                    key={step.id}
                    label={step.title}
                    link={`${formPath}${step.id}`}
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
          </>
        )}
        <StepComponent
          components={step.components}
          formData={continueForm ? savedData && savedData.data : formData}
          formSteps={formSteps}
          formPath={formPath}
          onStepSubmit={(data) => {
            const updatedData = continueForm
              ? { ...formData, ...data, ...savedData.data }
              : { ...formData, ...data };
            setFormData(updatedData);
            step.onStepSubmit && step.onStepSubmit(updatedData);
            fromSummary
              ? Router.push(stepPath, `${formPath}summary`)
              : Router.push(stepPath, nextStep);
          }}
          onSaveAndExit={(data) => {
            const updateSavedData = {
              ...data,
              ...formData,
              ...savedData.data,
            };

            saveData(formPath, updateSavedData, step.id);
            Router.push('/');
          }}
          onFormSubmit={onFormSubmit}
        />
      </fieldset>
    </div>
  );
};

FormWizard.propTypes = {
  formPath: PropTypes.string.isRequired,
  formSteps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      component: PropTypes.func,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func,
  defaultValues: PropTypes.shape({}),
};

export default FormWizard;
