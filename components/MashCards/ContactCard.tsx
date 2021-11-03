import s from './MashCard.module.scss';
import Link from 'next/link';
import { MashReferral } from 'types';

interface Props {
  mashReferrals: MashReferral;
  key: string;
}

const ContactCard = ({ mashReferrals, key }: Props): React.ReactElement => {
  return (
    <>
      <li className={s.row}>
        <div key={key}>
          <p className="lbh-body-m govuk-!-margin-bottom-3">
            <span className="govuk-tag lbh-tag lbh-tag--green">
              4 hours left
            </span>{' '}
            {mashReferrals.createdAt}
            <span className={`lbh-body-l lbh-!-font-weight-bold  ${s.action}`}>
              <Link href="contact">Action</Link>
            </span>
          </p>
          <hr className={s.line} />
          <dl className={s.stats}>
            <div>
              <dt>Name of client</dt>
              <dd>
                <Link href={mashReferrals.referralDocumentURI}>
                  <a>
                    {mashReferrals.clients[0]}
                    {mashReferrals.clients.length > 1 &&
                      ` + ${mashReferrals.clients.length - 1} `}{' '}
                    (referral)
                  </a>
                </Link>
              </dd>
            </div>
            <div>
              <dt>Referrer</dt>
              <dd>{mashReferrals.referrer}</dd>
            </div>
            <div>
              <dt>Requested support</dt>
              <dd>{mashReferrals.requestedSupport}</dd>
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

export default ContactCard;
