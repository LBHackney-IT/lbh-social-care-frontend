import s from 'components/MashTable/MashTable.module.scss';

const MASHtable = (): React.ReactElement | null => {
  return (
    <>
      <li className={s.row}>
        <div>
          <p className={`lbh-body-l govuk-!-margin-bottom-3 ${s.stats}`}>
            <dt>
              <span className="govuk-tag lbh-tag lbh-tag--green">
                4 hours left
              </span>{' '}
              10:00 6 Jun
            </dt>
          </p>
          <hr className={s.line} />
          <dl className={` ${s.stats}`}>
            <div>
              <dt>Name of client</dt>
              <dd>
                <a href="#">John Smith (referral)</a>
              </dd>
            </div>
            <div>
              <dt>Initial decision</dt>
              <dd>DAIS</dd>
            </div>
            <div>
              <dt>Referral category</dt>
              <dd>Emotional abuse</dd>
            </div>
            <div>
              <a>Assign</a>
            </div>
          </dl>
        </div>
        <div className={s.meter}></div>
      </li>

      <li className={s.row}>
        <div>
          <p className={`lbh-body-l govuk-!-margin-bottom-3 ${s.stats}`}>
            <dt>
              <span className="govuk-tag lbh-tag lbh-tag--green">
                4 hours left
              </span>{' '}
              10:00 6 Jun
            </dt>
          </p>
          <hr className={s.line} />
          <dl className={` ${s.stats}`}>
            <div>
              <dt>Name of client</dt>
              <dd>
                <a href="#">John Smith (referral)</a>
              </dd>
            </div>
            <div>
              <dt>Initial decision</dt>
              <dd>DAIS</dd>
            </div>
            <div>
              <dt>Referral category</dt>
              <dd>Emotional abuse</dd>
            </div>
            <div>
              <a>Assign</a>
            </div>
          </dl>
        </div>
        <div className={s.meter}></div>
      </li>
    </>
  );
};

export default MASHtable;
