import moment from 'moment';

interface Props {
  filter: string;
  createdAt: string;
  initialDecision: string | undefined;
}

const MashTags = ({
  filter,
  createdAt,
  initialDecision,
}: Props): React.ReactElement => {
  const currenttime = new Date().toISOString();
  const hoursPassed = moment(currenttime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]').diff(
    moment(createdAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
    'hours'
  );
  const minsPassed = moment(currenttime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]').diff(
    moment(createdAt, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'),
    'minutes'
  );
  if (filter === 'contact') {
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
      initialDecision == 'E3 Referral' ||
      initialDecision == 'EH Screening required in MASH'
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
    if (initialDecision == 'CSC Screening required in MASH') {
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
    if (initialDecision == 'Progress Straight to CSC Allocation') {
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
