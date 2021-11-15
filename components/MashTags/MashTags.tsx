import moment from 'moment';
import { MashReferral } from 'types';

interface Props {
  mashReferral: MashReferral;
}

const MashTags = ({ mashReferral }: Props): React.ReactElement => {
  const currenttime = new Date().toISOString();
  const hoursPassed = moment(currenttime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]').diff(
    moment(mashReferral.createdAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
    'hours'
  );
  const minsPassed = moment(currenttime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]').diff(
    moment(mashReferral.createdAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
    'minutes'
  );
  if (mashReferral.stage === 'CONTACT') {
    if (hoursPassed > 1 || hoursPassed == 1)
      return (
        <div className="govuk-tag lbh-tag lbh-tag--green">
          {hoursPassed} {hoursPassed == 1 ? 'hour' : 'hours'} ago
        </div>
      );
    if (hoursPassed < 1 && hoursPassed > 0)
      return (
        <div className="govuk-tag lbh-tag lbh-tag--green">
          {minsPassed} mins ago
        </div>
      );
    return <></>;
  } else {
    if (
      mashReferral.initialDecision?.toUpperCase() === 'E3 REFERRAL' ||
      mashReferral.initialDecision?.toUpperCase() ===
        'EH SCREENING REQUIRED IN MASH'
    ) {
      const greenTimer = 72 - hoursPassed;
      if (greenTimer < 1 && greenTimer > 0)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {greenTimer * 60} mins ago
          </div>
        );
      if (72 > hoursPassed)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {greenTimer} {greenTimer == 1 ? 'hour' : 'hours'} left
          </div>
        );
    }
    if (
      mashReferral.initialDecision?.toUpperCase() ===
      'CSC SCREENING REQUIRED IN MASH'
    ) {
      const amberTimer = 24 - hoursPassed;
      if (amberTimer < 1 && amberTimer > 0)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {amberTimer * 60} mins ago
          </div>
        );
      if (24 > hoursPassed)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {amberTimer} {amberTimer == 1 ? 'hour' : 'hours'} left
          </div>
        );
    }
    if (
      mashReferral.initialDecision?.toUpperCase() ===
      'PROGRESS STRAIGHT TO CSC ALLOCATION'
    ) {
      const redTimer = 4 - hoursPassed;
      if (redTimer < 1 && redTimer > 0)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {redTimer * 60} mins ago
          </div>
        );
      if (4 > hoursPassed)
        return (
          <div className="govuk-tag lbh-tag lbh-tag--green">
            {redTimer} {redTimer == 1 ? 'hour' : 'hours'} left
          </div>
        );
    }
    return <div className="govuk-tag lbh-tag lbh-tag--grey">Overdue</div>;
  }
};

export default MashTags;
