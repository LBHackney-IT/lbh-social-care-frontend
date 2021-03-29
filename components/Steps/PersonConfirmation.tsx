import { useRouter } from 'next/router';

import Button from 'components/Button/Button';

interface Props {
  formData: Record<string, unknown>;
}

const referralForm =
  'https://docs.google.com/forms/d/e/1FAIpQLSc4y4yjw6DpwWHN2fias1SEDo0lZZZNgN3M20Zy_p2He1rSuw/viewform';

const PersonConfirmation = ({ formData }: Props): React.ReactElement => {
  const router = useRouter();
  const { ref } = router.query;
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

export default PersonConfirmation;
