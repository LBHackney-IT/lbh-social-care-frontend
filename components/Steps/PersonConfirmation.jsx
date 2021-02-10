import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Button from 'components/Button/Button';

const PersonConfirmation = ({ formData, formSteps }) => {
  const router = useRouter();
  const { personId } = router.query;
  if (!formSteps) return null;
  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-7">
        Add new person confirmed
      </h1>
      <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-9">
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
          {formData.firstName} {formData.lastName} has been added.
          <br />#{personId}
        </h1>
      </div>
      <div>
        <Button label="View person" isSecondary route={`/people/${personId}`} />
      </div>
    </>
  );
};

PersonConfirmation.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  formSteps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default PersonConfirmation;
