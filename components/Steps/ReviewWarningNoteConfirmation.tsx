import { ExtendedResident } from 'types';
import Button from 'components/Button/Button';

export interface Props {
  formData: {
    person: ExtendedResident;
    reviewDecision: string;
    [key: string]: unknown;
  };
}

const ReviewWarningNoteConfirmation = ({
  formData,
}: Props): React.ReactElement => {
  return (
    <>
      <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-9">
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
          {formData.reviewDecision === 'Yes'
            ? `The Warning Note has been renewed for ${formData.person.firstName} ${formData.person.lastName}`
            : 'This Warning Note has been closed'}
        </h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button label="Return to search" isSecondary wideButton route={'/'} />
        <Button
          label="View person"
          wideButton
          route={`/people/${formData.person.personId}`}
        />
      </div>
    </>
  );
};

export default ReviewWarningNoteConfirmation;
