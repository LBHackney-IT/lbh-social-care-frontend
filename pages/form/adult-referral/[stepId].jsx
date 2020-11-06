import FormWizard from 'components/FormWizard/FormWizard';

import ClientDetails from 'components/Steps/client-details';
import ReferralDetails from 'components/Steps/referral-details';
import CaseNotes from 'components/Steps/case-notes';

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

const AdultReferral = () => (
  <FormWizard
    formPath={FORM_PATH}
    formSteps={FORM_STEPS}
    title="Create New Record"
  />
);

export default AdultReferral;
