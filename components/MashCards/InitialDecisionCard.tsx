import s from './MashCard.module.scss';

interface Props {
  clientname: string;
  timeleft: string;
  datetime: string;
  screeningDecision: string;
  referralCategory: string;
}
const InitialDecisionCard = ({
  clientname,
  timeleft,
  datetime,
  screeningDecision,
  referralCategory,
}: Props): React.ReactElement | null => {
  console.log(screeningDecision);
  return (
    <>
      <li className={s.row}>
        <div>
          <p className="lbh-body-m govuk-!-margin-bottom-3">
            <span className="govuk-tag lbh-tag lbh-tag--green">
              {timeleft} left
            </span>{' '}
            {datetime}
            <span
              className="lbh-body-l lbh-!-font-weight-bold"
              style={{ float: 'right', display: 'block' }}
            >
              <a href="#">Action </a>
            </span>
          </p>
          <hr className={s.line} />
          <dl className={s.stats}>
            <div>
              <dt>Name of client</dt>
              <dd>
                <a href="#">{clientname} (referral)</a>
              </dd>
            </div>
            <div>
              <dt>Screening decision</dt>
              <dd>{screeningDecision}</dd>
            </div>
            <div>
              <dt>Referral category</dt>
              <dd>{referralCategory}</dd>
            </div>
            <div>
              <a>Assign</a>
            </div>
          </dl>
        </div>
      </li>
      <div className={s.meter}></div>
    </>
  );
};

export default InitialDecisionCard;
