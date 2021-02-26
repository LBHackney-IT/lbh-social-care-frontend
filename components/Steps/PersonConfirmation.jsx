import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Button from 'components/Button/Button';

const referralForm =
  'https://docs.google.com/forms/d/e/1FAIpQLSc4y4yjw6DpwWHN2fias1SEDo0lZZZNgN3M20Zy_p2He1rSuw/viewform';

const PersonConfirmation = ({ formData, formSteps }) => {
  const router = useRouter();
  const { ref } = router.query;
  if (!formSteps) return null;
  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-7">
        Add new person confirmed
      </h1>
      <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-9">
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
          {formData.firstName} {formData.lastName} has been added.
          <br />#{ref}
        </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          label="View person"
          isSecondary
          wideButton
          route={`/people/${ref}`}
        />
        <Button label="Add referral details" wideButton route={referralForm} />
      </div>
    </>
  );
};

PersonConfirmation.propTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  formSteps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default PersonConfirmation;
