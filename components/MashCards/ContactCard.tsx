import s from './MashCard.module.scss';
import Link from 'next/link';
import { MashReferral } from 'types';
import { format } from 'date-fns';
import MashTag from 'components/MashTags/MashTags';

interface Props {
  mashReferral: MashReferral;
}

const ContactCard = ({ mashReferral }: Props): React.ReactElement => {
  return (
    <>
      <li className={s.row}>
        <div>
          <p className={`lbh-body-s govuk-!-margin-bottom-3 ${s.datetime}`}>
            <MashTag mashReferral={mashReferral} /> submitted{' '}
            {format(new Date(mashReferral.createdAt), 'HH:00 dd MMM')}
            <span className={`lbh-body-l lbh-!-font-weight-bold  ${s.action}`}>
              <Link href={`mash-referral/${mashReferral.id}/contact-decision`}>
                Work on
              </Link>
            </span>
          </p>
          <hr className={s.line} />
          <dl className={s.stats}>
            <div>
              <dt>Name of client</dt>
              <dd>
                <Link href={mashReferral.referralDocumentURI}>
                  <a>
                    {mashReferral.clients[0] + ' '}
                    {mashReferral.clients.length > 1 &&
                      `+ ${mashReferral.clients.length - 1} `}
                    (referral)
                  </a>
                </Link>
              </dd>
            </div>
            <div>
              <dt>Referrer</dt>
              <dd>{mashReferral.referrer}</dd>
            </div>
            <div>
              <dt>Requested support</dt>
              <dd>{mashReferral.requestedSupport}</dd>
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
