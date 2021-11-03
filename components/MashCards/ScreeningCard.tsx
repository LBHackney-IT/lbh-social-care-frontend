import s from './MashCard.module.scss';
import { MashReferral } from 'types';
import Link from 'next/link';

interface Props {
  mashReferrals: MashReferral;
}
const ScreeningCard = ({ mashReferrals }: Props): React.ReactElement | null => {
  return (
    <>
      <li className={s.row}>
        <div>
          <p className="lbh-body-m govuk-!-margin-bottom-3">
            <span className="govuk-tag lbh-tag lbh-tag--green">
              4 hours left
            </span>{' '}
            {mashReferrals.createdAt}
            <span className={`lbh-body-l lbh-!-font-weight-bold  ${s.action}`}>
              <Link href="action">Action </Link>
            </span>
          </p>
          <hr className={s.line} />
          <dl className={s.stats}>
            <div>
              <dt>Name of client</dt>
              <dd>
                <Link href="referral">
                  <a href="#">{mashReferrals.clients[0]}(referral)</a>
                </Link>
              </dd>
            </div>
            <div>
              <dt>Initial decision</dt>
              <dd>{mashReferrals.initialDecision}</dd>
            </div>
            <div>
              <dt>Referral category</dt>
              <dd>{mashReferrals.referralCategory}</dd>
            </div>
            <div>
              <Link href="assign">
                <a>Assign</a>
              </Link>
            </div>
          </dl>
        </div>
      </li>
      <div className={s.meter}></div>
    </>
  );
};

export default ScreeningCard;
