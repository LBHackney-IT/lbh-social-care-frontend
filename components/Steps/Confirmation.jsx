import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Summary from 'components/Summary/Summary';
import LinkButton from 'components/LinkButton/LinkButton';

const ConfirmationStep = ({ formData, formSteps, formPath }) => {
  const router = useRouter();
  const { ref } = router.query;
  if (!formSteps) return null;
  return (
    <div>
      <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-9">
        <h1 className="govuk-panel__title">Application complete</h1>
        {ref && (
          <div className="govuk-panel__body">
            Your reference code
            <br />
            <strong>{ref}</strong>
          </div>
        )}
      </div>
      <LinkButton label="Home" route="/" />
      <Summary formData={formData} formPath={formPath} formSteps={formSteps} />
    </div>
  );
};

ConfirmationStep.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  formSteps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  formPath: PropTypes.string.isRequired,
};

export default ConfirmationStep;
