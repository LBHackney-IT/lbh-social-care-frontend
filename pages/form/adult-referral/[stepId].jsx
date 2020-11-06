import { useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import ClientDetails from 'components/Steps/client-details';
import ReferralDetails from 'components/Steps/referral-details';
import CaseNotes from 'components/Steps/case-notes';

const FORM_PATH = '/form/adult-referral/';
const FORM_STEPS = {
  'client-details': ClientDetails,
  'referral-details': ReferralDetails,
  'case-notes': CaseNotes,
};

const stepKeys = Object.keys(FORM_STEPS);
const stepPath = `${FORM_PATH}[step]`;

const getAdjacentSteps = (step) => {
  const currentStep = stepKeys.findIndex((s) => s === step);
  return {
    previousStep:
      currentStep > 0 ? `${FORM_PATH}${stepKeys[currentStep - 1]}` : null,
    nextStep:
      currentStep < stepKeys.length
        ? `${FORM_PATH}${stepKeys[currentStep + 1]}`
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
  const firstStep = stepKeys[0];
  if (stepId && !formData.mosaic_id && stepId !== firstStep) {
    Router.replace(`${FORM_PATH}${firstStep}`);
    return null;
  }
  const Step = FORM_STEPS[stepId];
  if (!Step) {
    return null;
  }
  const { previousStep, nextStep } = getAdjacentSteps(stepId);
  return (
    <div className="govuk-width-container">
      {previousStep && (
        <Link href={stepPath} as={previousStep}>
          <a className="govuk-back-link">Back</a>
        </Link>
      )}
      <main className="govuk-main-wrapper">
        <Step
          formData={formData}
          saveData={(data) => setFormData({ ...formData, ...data })}
          nextStep={nextStep}
          stepPath={stepPath}
        />
      </main>
    </div>
  );
};

export default AdultReferral;
