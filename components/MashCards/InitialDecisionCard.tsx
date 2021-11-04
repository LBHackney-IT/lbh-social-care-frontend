import s from './MashCard.module.scss';
import { MashReferral } from 'types';
import Link from 'next/link';

interface Props {
  mashReferral: MashReferral;
}
const InitialDecisionCard = ({ mashReferral }: Props): React.ReactElement => {
  return (
    <>
      <li className={s.row}>
        <div>
          <p className="lbh-body-m govuk-!-margin-bottom-3">
            <span className="govuk-tag lbh-tag lbh-tag--green">
              4 hours left
            </span>{' '}
            {mashReferral.createdAt}
            <span className={`lbh-body-l lbh-!-font-weight-bold  ${s.action}`}>
              <Link href="initial-decision">Action </Link>
            </span>
          </p>
          <hr className={s.line} />
          <dl className={s.stats}>
            <div>
              <dt>Name of client</dt>
              <dd>
                <Link href={mashReferral.referralDocumentURI}>
                  <a>
                    {mashReferral.clients[0]}
                    {mashReferral.clients.length > 1 &&
                      ` + ${mashReferral.clients.length - 1} `}
                    (referral)
                  </a>
                </Link>
              </dd>
            </div>
            <div>
              <dt>Screening decision</dt>
              <dd>{mashReferral.screeningDecision}</dd>
            </div>
            <div>
              <dt>Referral category</dt>
              <dd>{mashReferral.referralCategory}</dd>
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

export default InitialDecisionCard;
