import s from './index.module.scss';
import { InProgressSubmission } from 'data/flexibleForms/forms.types';
import Link from 'next/link';
import { generateSubmissionUrl } from 'lib/submissions';
import { mapFormIdToFormDefinition } from 'data/flexibleForms/mapFormIdsToFormDefinition';
import { useUnfinishedSubmissions } from 'utils/api/submissions';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

interface SubProps {
  sub: InProgressSubmission;
}

const Sub = ({ sub }: SubProps): React.ReactElement => {
  const completedSteps = sub.completedSteps;

  const form = mapFormIdToFormDefinition[sub.formId]?.form;
  const totalSteps = form?.steps.length;

  const completedPercentageDisplay = totalSteps
    ? `${Math.round((completedSteps / Number(totalSteps)) * 100)}% complete · `
    : 'Unknown % complete · ';

  return (
    <li key={sub.submissionId}>
      <Link href={generateSubmissionUrl(sub)}>{form?.name || sub.formId}</Link>
      <p className="lbh-body-xs">
        {completedPercentageDisplay}
        {sub.createdBy.email}
      </p>
    </li>
  );
};

interface Props {
  personId: number;
}

const UnfinishedSubmissionsEvent = ({
  personId,
}: Props): React.ReactElement => {
  const {
    data: unfinishedSubmissionRes,
    isValidating,
    error,
  } = useUnfinishedSubmissions(personId);

  return (
    <li
      className={`lbh-timeline__event lbh-timeline__event--action-needed ${s.unfinishedSubmissionsPanel}`}
    >
      <h3 className="govuk-!-margin-bottom-4">Unfinished submissions</h3>
      {isValidating && <Spinner />}
      {error && (
        <ErrorMessage label="There was a problem fetching unfinished submissions" />
      )}
      {unfinishedSubmissionRes?.items?.length === 0 && (
        <p>No unfinished submissions to show</p>
      )}

      {unfinishedSubmissionRes && unfinishedSubmissionRes.items.length > 0 && (
        <>
          <ul className="lbh-list lbh-body-s">
            {unfinishedSubmissionRes?.items.slice(0, 4).map((sub) => (
              <Sub sub={sub} key={sub.submissionId} />
            ))}
          </ul>
          {unfinishedSubmissionRes?.items.length > 4 && (
            <p className="lbh-body-s govuk-!-margin-top-4">
              and {unfinishedSubmissionRes?.count - 4} more
            </p>
          )}
        </>
      )}
    </li>
  );
};

export default UnfinishedSubmissionsEvent;
