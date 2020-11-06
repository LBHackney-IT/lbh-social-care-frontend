import { useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import ClientDetails from 'components/Steps/client-details';
import ReferralDetails from 'components/Steps/referral-details';
import CaseNotes from 'components/Steps/case-notes';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

const FORM_PATH = '/form/adult-referral/';
const FORM_STEPS = [
  { id: 'client-details', component: ClientDetails, title: 'Client Details' },
  {
    id: 'referral-details',
    component: ReferralDetails,
    title: 'Referral Details',
  },
  { id: 'case-notes', component: CaseNotes, title: 'Case Notes' },
];

const stepPath = `${FORM_PATH}[step]`;

const getAdjacentSteps = (currentStepIndex) => {
  return {
    previousStep:
      currentStepIndex > 0
        ? `${FORM_PATH}${FORM_STEPS[currentStepIndex - 1].id}`
        : null,
    nextStep:
      currentStepIndex < FORM_STEPS.length - 1
        ? `${FORM_PATH}${FORM_STEPS[currentStepIndex + 1].id}`
        : null,
  };
};

const AdultReferral = () => {
  Router.events.on('routeChangeComplete', () => {
    window.scrollTo(0, 0);
  });
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const { stepId } = router.query;
  const firstStep = FORM_STEPS[0].id;
  if (stepId && !formData.mosaic_id && stepId !== firstStep) {
    Router.replace(`${FORM_PATH}${firstStep}`);
    return null;
  }
  const step = FORM_STEPS.find(({ id }) => id === stepId);
  if (!step) {
    return null;
  }
  const StepComponent = step.component;
  const currentStepIndex = FORM_STEPS.findIndex(({ id }) => id === step.id);
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
          <h1 className="govuk-fieldset__heading">Create new record</h1>
        </legend>
        <div className="govuk-breadcrumbs">
          <ol className="govuk-breadcrumbs__list">
            {FORM_STEPS.map(
              (step, index) =>
                console.log(currentStepIndex, index) || (
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
                )
            )}
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

export default AdultReferral;
