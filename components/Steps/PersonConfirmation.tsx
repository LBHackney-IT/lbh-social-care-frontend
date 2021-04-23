import { useRouter } from 'next/router';

import Button from 'components/Button/Button';

interface Props {
  formData: Record<string, unknown>;
  successMessage?: string;
}

const referralForm =
  'https://docs.google.com/forms/d/e/1FAIpQLSc4y4yjw6DpwWHN2fias1SEDo0lZZZNgN3M20Zy_p2He1rSuw/viewform';

const PersonConfirmation = ({
  formData,
  successMessage,
}: Props): React.ReactElement => {
  const { query, asPath } = useRouter();
  const { ref } = query;
  return (
    <>
      {successMessage && (
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-7">
          {successMessage}
        </h1>
      )}
      <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-9">
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
          {formData.firstName} {formData.lastName} has been{' '}
          {asPath?.includes('add') ? 'added' : 'updated'}.
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
