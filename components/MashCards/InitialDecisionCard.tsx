import s from './MashCard.module.scss';
import { MashReferral } from 'types';
import Link from 'next/link';
import { format } from 'date-fns';
import MashTag from 'components/MashTags/MashTags';
import MashAssignmentsWidget from 'components/MashAssignmentFlow/MashAssignmentWidget';
import MashPriorityBanner from 'components/MashPriorityBanner/MashPriorityBanner';

interface Props {
  mashReferral: MashReferral;
  assignWorkerToReferral: (referralId: number) => void;
}
const InitialDecisionCard = ({
  mashReferral,
  assignWorkerToReferral,
}: Props): React.ReactElement => {
  return (
    <>
      <MashPriorityBanner
        isPriority={mashReferral.contactUrgentContactRequired as boolean}
      >
        <div>
          <p className={`lbh-body-s govuk-!-margin-bottom-3 ${s.datetime}`}>
            <MashTag mashReferral={mashReferral} /> submitted{' '}
            {format(new Date(mashReferral.referralCreatedAt), 'HH:00 dd MMM')}
            <span className={`lbh-body-l lbh-!-font-weight-bold  ${s.action}`}>
              <Link href={`mash-referral/${mashReferral.id}/initial-decision`}>
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
                    {mashReferral.mashResidents[0].firstName + ' '}
                    {mashReferral.mashResidents[0].lastName + ' '}
                    {mashReferral.mashResidents.length > 1 &&
                      `+ ${mashReferral.mashResidents.length - 1} `}
                    (referral)
                  </a>
                </Link>
              </dd>
            </div>
            <div>
              <dt>Requested support</dt>
              <dd>{mashReferral.requestedSupport}</dd>
            </div>
            <div>
              <dt></dt>
              <dd></dd>
            </div>
            <div>
              <MashAssignmentsWidget />
            </div>
          </dl>
        </div>
      </MashPriorityBanner>
      <div className={s.meter}></div>
    </>
  );
};

export default InitialDecisionCard;
