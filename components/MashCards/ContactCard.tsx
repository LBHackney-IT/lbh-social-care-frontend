import s from './MashCard.module.scss';

interface Props {
  clientName: string;
  timeLeft: string;
  dateTime: string;
  referrer: string;
  requestedSupport: string;
}
const ContactCard = ({
  clientName,
  timeLeft,
  dateTime,
  referrer,
  requestedSupport,
}: Props): React.ReactElement | null => {
  return (
    <>
      <li className={s.row}>
        <div>
          <p className="lbh-body-m govuk-!-margin-bottom-3">
            <span className="govuk-tag lbh-tag lbh-tag--green">
              {timeLeft} left
            </span>{' '}
            {dateTime}
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
                <a href="#">{clientName} (referral)</a>
              </dd>
            </div>
            <div>
              <dt>Referrer</dt>
              <dd>{referrer}</dd>
            </div>
            <div>
              <dt>Requested support</dt>
              <dd>{requestedSupport}</dd>
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

export default ContactCard;
