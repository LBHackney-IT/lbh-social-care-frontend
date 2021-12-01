import s from './MashCard.module.scss';
import { MashReferral } from 'types';
import Link from 'next/link';
import { format } from 'date-fns';
import MashTag from 'components/MashTags/MashTags';

interface Props {
  mashReferral: MashReferral;
}
const FinalDecisionCard = ({ mashReferral }: Props): React.ReactElement => {
  return (
    <>
      {mashReferral.screeningUrgentContactRequired && (
        <div className={s.priority}>&nbsp;High priority</div>
      )}
      <li
        className={
          mashReferral.screeningUrgentContactRequired
            ? `${s.row} ${s.priorityrow}`
            : s.row
        }
      >
        <div>
          <p className={`lbh-body-s govuk-!-margin-bottom-3 ${s.datetime}`}>
            <MashTag mashReferral={mashReferral} /> submitted{' '}
            {format(new Date(mashReferral.createdAt), 'HH:00 dd MMM')}
            <span className={`lbh-body-l lbh-!-font-weight-bold  ${s.action}`}>
              <Link href={`mash-referral/${mashReferral.id}/final-decision`}>
                Make decision
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
              <dt>Screening decision</dt>
              <dd>{mashReferral.screeningDecision}</dd>
            </div>
            <div>
              <dt>Referral category</dt>
              <dd>{mashReferral.initialReferralCategory}</dd>
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

export default FinalDecisionCard;
