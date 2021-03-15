import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Button from 'components/Button/Button';

const DetailConfirmation = ({ formSteps, successMessage }) => {
  const router = useRouter();
  const { id } = router.query;
  if (!formSteps) return null;
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

DetailConfirmation.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  formSteps: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string }))
    .isRequired,
  formPath: PropTypes.string.isRequired,
  successMessage: PropTypes.string,
  isSummaryCollapsable: PropTypes.bool,
};

export default DetailConfirmation;
