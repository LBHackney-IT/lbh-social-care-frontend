import { useRouter } from 'next/router';

import Summary from 'components/Summary/Summary';
import { FormStep } from 'components/Form/types';

interface Props {
  formData: Record<string, unknown>;
  formSteps: FormStep[];
  formPath: string;
  successMessage?: string;
  isSummaryCollapsable?: boolean;
}

const ConfirmationStep = ({
  formData,
  formSteps,
  formPath,
  successMessage,
  isSummaryCollapsable,
}: Props): React.ReactElement => {
  const router = useRouter();
  const { ref } = router.query;
  return (
    <div>
      <div className="govuk-panel govuk-panel--confirmation lbh-panel govuk-!-margin-bottom-9">
        <h1 className="govuk-panel__title">
          {successMessage || 'Submission complete'}
        </h1>
        {ref && (
          <div className="govuk-panel__body">
            Your reference code
            <br />
            <strong>{ref}</strong>
          </div>
        )}
      </div>
      <Summary
        formData={formData}
        formPath={formPath}
        formSteps={formSteps}
        isSummaryCollapsable={isSummaryCollapsable}
      />
    </div>
  );
};

export default ConfirmationStep;
