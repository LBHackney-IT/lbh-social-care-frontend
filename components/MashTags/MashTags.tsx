import { MashReferral, ReferralStage } from 'types';

interface Props {
  mashReferral: MashReferral;
}

//rag ratings for time thresholds (highRating - red rag rating, mediumRating - amber rag rating, lowRating - green rag rating)
const highRating = 4 * 60 * 60 * 1000;
const mediumRating = 24 * 60 * 60 * 1000;
const lowRating = 72 * 60 * 60 * 1000;

const initialLowRatings = new Set([
  'E3 REFERRAL',
  'EH SCREENING REQUIRED IN MASH',
]);

const initialMedRatings = new Set(['CSC SCREENING REQUIRED IN MASH']);

const initialHighRatings = new Set(['PROGRESS STRAIGHT TO CSC ALLOCATION']);

const timeMetrics = (mashReferral: MashReferral) => {
  const minsPassed =
    (Number(new Date()) - Number(new Date(mashReferral.referralCreatedAt))) /
    60 /
    1000;

  const hoursPassed =
    (Number(new Date()) - Number(new Date(mashReferral.referralCreatedAt))) /
    60 /
    60 /
    1000;

  let timeLeftinMilliseconds = 0;

  if (
    mashReferral.stage === ReferralStage.SCREENING ||
    mashReferral.stage === ReferralStage.FINAL
  ) {
    let initialMinsPassed = 0;
    if (mashReferral.initialDecisionCreatedAt != undefined)
      initialMinsPassed = Math.round(
        Number(new Date()) -
          Number(new Date(mashReferral.initialDecisionCreatedAt))
      );

    if (
      initialLowRatings.has(mashReferral.initialDecision?.toUpperCase() || '')
    ) {
      timeLeftinMilliseconds = lowRating - initialMinsPassed;
    }
    if (
      initialMedRatings.has(mashReferral.initialDecision?.toUpperCase() || '')
    ) {
      timeLeftinMilliseconds = mediumRating - initialMinsPassed;
    }
    if (
      initialHighRatings.has(mashReferral.initialDecision?.toUpperCase() || '')
    ) {
      timeLeftinMilliseconds = highRating - initialMinsPassed;
    }
  } else if (mashReferral.stage === ReferralStage.INITIAL) {
    timeLeftinMilliseconds = mediumRating - minsPassed * 60 * 1000;
  }
  const isOverdue = timeLeftinMilliseconds < 0;
  return {
    hoursPassed,
    minsPassed,
    timeLeftinMilliseconds,
    isOverdue,
  };
};

const MashTags = ({ mashReferral }: Props): React.ReactElement => {
  const { hoursPassed, minsPassed, timeLeftinMilliseconds, isOverdue } =
    timeMetrics(mashReferral);

  if (mashReferral.stage === ReferralStage.CONTACT) {
    if (minsPassed < 60)
      return (
        <div className="govuk-tag lbh-tag lbh-tag--green">
          {Math.round(minsPassed)} mins ago
        </div>
      );
    if (hoursPassed > 1 || hoursPassed === 1)
      return (
        <div className="govuk-tag lbh-tag lbh-tag--green">
          {Math.round(hoursPassed)} {hoursPassed == 1 ? 'hour' : 'hours'} ago
        </div>
      );
  }
  if (isOverdue === false) {
    if (timeLeftinMilliseconds / 60 / 1000 < 60)
      return (
        <div className="govuk-tag lbh-tag lbh-tag--green">
          {Math.round(timeLeftinMilliseconds / 60 / 1000)} mins left
        </div>
      );
    else
      return (
        <div className="govuk-tag lbh-tag lbh-tag--green">
          {Math.round(timeLeftinMilliseconds / 60 / 60 / 1000)}{' '}
          {Math.round(timeLeftinMilliseconds / 60 / 60 / 1000) === 1
            ? 'hour'
            : 'hours'}{' '}
          left
        </div>
      );
  }
  return <div className="govuk-tag lbh-tag lbh-tag--grey">Overdue</div>;
};

export default MashTags;
