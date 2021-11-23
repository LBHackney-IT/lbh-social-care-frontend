import moment from 'moment';
import { MashReferral } from 'types';

interface Props {
  mashReferral: MashReferral;
}
const highRating = 4;
const mediumRating = 24;
const lowRating = 72;

const MashTags = ({ mashReferral }: Props): React.ReactElement => {
  const currentTime = new Date().toISOString();
  const hoursPassed = moment(currentTime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]').diff(
    moment(mashReferral.createdAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
    'hours'
  );
  const minsPassed = moment(currentTime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]').diff(
    moment(mashReferral.createdAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
    'minutes'
  );
  if (mashReferral.stage === 'CONTACT') {
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

    return <></>;
  } else {
    if (mashReferral.stage === 'INITIAL') {
      const timeLeft = mediumRating - hoursPassed;
      if (timeLeft < 1 && timeLeft > 0)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {timeLeft * 60} mins ago
          </div>
        );
      if (timeLeft > 0)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {timeLeft} {timeLeft == 1 ? 'hour' : 'hours'} left
          </div>
        );
    }
    if (
      mashReferral.initialDecision?.toUpperCase() ===
      'CSC SCREENING REQUIRED IN MASH'
    ) {
      const initialhoursPassed = moment(
        currentTime,
        'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'
      ).diff(
        moment(mashReferral.initialCreatedAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
        'hours'
      );
      const timeLeft = mediumRating - initialhoursPassed;
      if (timeLeft < 1 && timeLeft > 0)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {timeLeft * 60} mins ago
          </div>
        );
      if (timeLeft > 0)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {timeLeft} {timeLeft == 1 ? 'hour' : 'hours'} left
          </div>
        );
    }
    if (
      mashReferral.initialDecision?.toUpperCase() === 'E3 REFERRAL' ||
      mashReferral.initialDecision?.toUpperCase() ===
        'EH SCREENING REQUIRED IN MASH'
    ) {
      const initialhoursPassed = moment(
        currentTime,
        'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'
      ).diff(
        moment(mashReferral.initialCreatedAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
        'hours'
      );
      const timeLeft = lowRating - initialhoursPassed;
      if (timeLeft < 1 && timeLeft > 0)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {timeLeft * 60} mins ago
          </div>
        );
      if (timeLeft > 0)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {timeLeft} {timeLeft == 1 ? 'hour' : 'hours'} left
          </div>
        );
    }
    if (
      mashReferral.initialDecision?.toUpperCase() ===
      'PROGRESS STRAIGHT TO CSC ALLOCATION'
    ) {
      const initialhoursPassed = moment(
        currentTime,
        'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'
      ).diff(
        moment(mashReferral.initialCreatedAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
        'hours'
      );
      const timeLeft = highRating - initialhoursPassed;
      if (timeLeft < 1 && timeLeft > 0)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {timeLeft * 60} mins ago
          </div>
        );
      if (timeLeft > 0)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {timeLeft} {timeLeft == 1 ? 'hour' : 'hours'} left
          </div>
        );
    }
    return <div className="govuk-tag lbh-tag lbh-tag--grey">Overdue</div>;
  }
};

export default MashTags;
