import moment from 'moment';
import { MashReferral, ReferralStage } from 'types';

interface Props {
  mashReferral: MashReferral;
}
const highRating = 4 * 60 * 60 * 1000;
const mediumRating = 24 * 60 * 60 * 1000;
const lowRating = 72 * 60 * 60 * 1000;

const initialLowRatings = new Set([
  'E3 REFERRAL',
  'EH SCREENING REQUIRED IN MASH',
]);

const initialMedRatings = new Set(['CSC SCREENING REQUIRED IN MASH']);

const initialHighRatings = new Set(['PROGRESS STRAIGHT TO CSC ALLOCATION']);

const output = (mashReferral: MashReferral) => {
  const currentTime = new Date().toISOString();
  const hoursPassed = moment(currentTime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]').diff(
    moment(mashReferral.createdAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
    'hours'
  );
  const minsPassed = moment(currentTime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]').diff(
    moment(mashReferral.createdAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
    'minutes'
  );
  let timeLeftinMilliseconds = 0;

  if (
    mashReferral.stage === ReferralStage.SCREENING ||
    mashReferral.stage === ReferralStage.FINAL
  ) {
    const initialMinsPassed = moment(
      currentTime,
      'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'
    ).diff(
      moment(mashReferral.initialCreatedAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
      'minutes'
    );

    if (
      initialLowRatings.has(mashReferral.initialDecision?.toUpperCase() || '')
    ) {
      timeLeftinMilliseconds = lowRating - initialMinsPassed * 60 * 1000;
    }
    if (
      initialMedRatings.has(mashReferral.initialDecision?.toUpperCase() || '')
    ) {
      timeLeftinMilliseconds = mediumRating - initialMinsPassed * 60 * 1000;
    }
    if (
      initialHighRatings.has(mashReferral.initialDecision?.toUpperCase() || '')
    ) {
      timeLeftinMilliseconds = highRating - initialMinsPassed * 60 * 1000;
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
    output(mashReferral);

  if (mashReferral.stage === ReferralStage.CONTACT) {
    if (minsPassed < 60)
      return (
        <div className="govuk-tag lbh-tag lbh-tag--green">
          {minsPassed} mins ago
        </div>
      );
    if (hoursPassed > 1 || hoursPassed == 1)
      return (
        <div className="govuk-tag lbh-tag lbh-tag--green">
          {hoursPassed} {hoursPassed == 1 ? 'hour' : 'hours'} ago
        </div>
      );
  }
  if (isOverdue === false) {
    if (timeLeftinMilliseconds / 60 / 1000 < 60)
      return (
        <div className="govuk-tag lbh-tag lbh-tag--green">
          {timeLeftinMilliseconds / 60 / 1000} mins left
        </div>
      );
    else
      return (
        <div className="govuk-tag lbh-tag lbh-tag--green">
          {timeLeftinMilliseconds / 60 / 60 / 1000}{' '}
          {timeLeftinMilliseconds / 60 / 60 / 1000 == 1 ? 'hour' : 'hours'} left
        </div>
      );
  }
  return <div className="govuk-tag lbh-tag lbh-tag--grey">Overdue</div>;
};

export default MashTags;
