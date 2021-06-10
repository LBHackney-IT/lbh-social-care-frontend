import { useRouter } from 'next/router';

import Button from 'components/Button/Button';

interface Props {
  successMessage: string;
}

const DetailConfirmation = ({ successMessage }: Props): React.ReactElement => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div className="govuk-panel govuk-panel--confirmation lbh-panel govuk-!-margin-bottom-9">
        <h1 className="govuk-panel__title">{successMessage}</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          label="Return to search"
          isSecondary
          wideButton
          route={`/search`}
        />
        <Button label="View person" wideButton route={`/people/${id}`} />
      </div>
    </>
  );
};

export default DetailConfirmation;
