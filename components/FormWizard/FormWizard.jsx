import { useState } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { useBeforeunload } from 'react-beforeunload';

import Seo from 'components/Layout/Seo/Seo';
import DynamicStep from 'components/FormWizard/DynamicStep';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { createSteps, getNextStepPath, haveStepsChanged } from 'utils/steps';
import { deepmerge } from 'utils/objects';
import { getQueryString } from 'utils/urls';
import { getFormData, saveData } from 'utils/saveData';

const FormWizard = ({
  formPath,
  formSteps,
  successMessage,
  onFormSubmit,
  defaultValues = {},
  title,
  personDetails,
  includesDetails,
  hideBackButton,
  customConfirmation,
  customSummary,
  isSummaryCollapsable = true,
}) => {
  Router.events.on('routeChangeComplete', () => {
    window.scrollTo(0, 0);
  });
  useBeforeunload(() => "You'll lose your data!");
  const {
    query: { stepId, fromSummary, continueForm, ...otherQS },
  } = useRouter();
  const [formData, setFormData] = useState({
    ...defaultValues,
    ...otherQS,
    ...(continueForm ? getFormData(formPath)?.data : {}),
  });
  const [queryString] = useState(otherQS);
  const steps = createSteps(formSteps, {
    confirmation: customConfirmation,
    summary: customSummary,
  });

  const stepPath = `${formPath}[step]`;
  const step =
    steps.find(
      ({ id }) => id === (Array.isArray(stepId) ? stepId[0] : stepId)
    ) || formSteps[0];
  if (!step) {
    return null;
  }
  const currentStepIndex = steps.findIndex(({ id }) => id === step.id);
  const StepComponent = step.component ? step.component : DynamicStep;
  return (
    <div className="govuk-width-container">
      <Seo title={`${step.title} - ${title}`} />
      {!hideBackButton && currentStepIndex !== 0 && step.id !== 'confirmation' && (
        <a className="govuk-back-link" href="#" onClick={() => Router.back()}>
          Back
        </a>
      )}
      <fieldset
        className="govuk-fieldset"
        role="group"
        aria-describedby="step-hint"
      >
        {steps.length > 3 &&
          step.id !== 'summary' &&
          step.id !== 'confirmation' && (
            <>
              <Breadcrumbs
                data={formData}
                path={formPath}
                steps={formSteps}
                currentStepIndex={currentStepIndex}
              />
              <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                <h1 className="govuk-fieldset__heading">{step.title}</h1>
              </legend>
            </>
          )}
        <StepComponent
          {...step}
          key={stepId?.join('-')}
          stepId={stepId}
          formData={formData}
          formSteps={formSteps}
          formPath={formPath}
          onStepSubmit={(data, addAnother) => {
            const updatedData = step.isMulti
              ? deepmerge(formData, data)
              : { ...formData, ...data };
            setFormData(updatedData);
            step.onStepSubmit && step.onStepSubmit(updatedData);
            fromSummary &&
            !haveStepsChanged(formSteps, formData, updatedData) &&
            !addAnother
              ? Router.push(stepPath, `${formPath}summary`)
              : Router.push(
                  stepPath,
                  addAnother
                    ? `${formPath}${stepId[0]}/${
                        updatedData[Object.keys(data)[0]]?.length + 1 || 2
                      }`
                    : getNextStepPath(
                        currentStepIndex,
                        steps,
                        formPath,
                        updatedData
                      )
                );
          }}
          onSaveAndExit={(data) => {
            const updatedData = step.isMulti
              ? deepmerge(formData, data)
              : { ...formData, ...data };
            saveData({
              data: updatedData,
              title,
              formPath,
              step: queryString
                ? `${window.location.pathname}?${getQueryString(queryString)}`
                : window.location.pathname,
              personDetails: includesDetails && personDetails,
            });
            Router.push('/form-in-progress');
          }}
          onFormSubmit={onFormSubmit}
          successMessage={successMessage}
          isSummaryCollapsable={steps.length > 3 && isSummaryCollapsable}
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
  hideBackButton: PropTypes.bool,
  onFormSubmit: PropTypes.func,
  defaultValues: PropTypes.shape({}),
  isSummaryCollapsable: PropTypes.bool,
  includesDetails: PropTypes.bool,
  successMessage: PropTypes.string,
  customConfirmation: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  customSummary: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  personDetails: PropTypes.object,
};

export default FormWizard;
