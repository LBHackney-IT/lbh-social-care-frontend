import { Resident } from 'types';
import Button from 'components/Button/Button';

export interface Props {
  formData: {
    person: Resident;
    reviewDecision: string;
    [key: string]: unknown;
  };
}

const ReviewWarningNoteConfirmation = ({
  formData,
}: Props): React.ReactElement => {
  return (
    <>
      <div className="govuk-panel govuk-panel--confirmation lbh-panel">
        <div className="govuk-panel__body">
          {formData.reviewDecision === 'Yes'
            ? `The Warning Note has been renewed for ${formData.person.firstName} ${formData.person.lastName}`
            : `This Warning Note has been closed for ${formData.person.firstName} ${formData.person.lastName}`}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          label="Return to search"
          isSecondary
          wideButton
          route={`/search`}
        />
        <Button
          label="View person"
          wideButton
          route={`/people/${formData.person.id}`}
        />
      </div>
    </>
  );
};

export default ReviewWarningNoteConfirmation;
