import { useRouter } from 'next/router';

import Button from 'components/Button/Button';
import { FormStep } from 'components/Form/types';

interface Props {
  formSteps: FormStep[];
  successMessage?: string;
}

const DetailConfirmation = ({
  formSteps,
  successMessage,
}: Props): React.ReactElement => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-7">
        {successMessage || 'Submission complete'}
      </h1>
      <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-9">
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
          {formSteps[0].title} details have been added
        </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button label="Return to search" isSecondary wideButton route={`/`} />
        <Button label="View person" wideButton route={`/people/${id}`} />
      </div>
    </>
  );
};

export default DetailConfirmation;
