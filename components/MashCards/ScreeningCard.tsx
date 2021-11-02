import s from './MashCard.module.scss';

interface Props {
  clientname: string;
  timeleft: string;
  datetime: string;
  initialDecision: string;
  referralCategory: string;
}
const ScreeningCard = ({
  clientname,
  timeleft,
  datetime,
  initialDecision,
  referralCategory,
}: Props): React.ReactElement | null => {
  return (
    <>
      <li className={s.row}>
        <div>
          <p className="lbh-body-m govuk-!-margin-bottom-3">
            <span className="govuk-tag lbh-tag lbh-tag--green">
              {timeleft} left
            </span>{' '}
            {datetime}
            <span className={`lbh-body-l lbh-!-font-weight-bold  ${s.action}`}>
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
              <dt>Initial decision</dt>
              <dd>{initialDecision}</dd>
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

export default ScreeningCard;
