import s from './MashCard.module.scss';

interface Props {
  clientname: string;
  timeleft: string;
  datetime: string;
  info1: string;
  info2: string;
}
const MASHtable = ({
  clientname,
  timeleft,
  datetime,
  info1,
  info2,
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
              <dt>Initial decision</dt>
              <dd>{info1}</dd>
            </div>
            <div>
              <dt>Referral category</dt>
              <dd>{info2}</dd>
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

export default MASHtable;
