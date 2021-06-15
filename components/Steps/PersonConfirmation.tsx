import { useRouter } from 'next/router';

import Button from 'components/Button/Button';

interface Props {
  formData: Record<string, unknown>;
  successMessage?: string;
}

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
      <div className="govuk-panel govuk-panel--confirmation lbh-panel govuk-!-margin-bottom-9">
        <h1 className="govuk-panel__title">
          {formData.firstName} {formData.lastName} has been{' '}
          {asPath?.includes('add') ? 'added' : 'updated'}.
          <br />#{ref}
        </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          label="Return to search"
          isSecondary
          wideButton
          route={`/search`}
        />
        <Button label="View person" wideButton route={`/people/${ref}`} />
      </div>
    </>
  );
};

export default PersonConfirmation;
