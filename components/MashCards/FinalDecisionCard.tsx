import s from './MashCard.module.scss';
import { MashReferral } from 'types';
import Link from 'next/link';
import { format } from 'date-fns';
import MashTag from 'components/MashTags/MashTags';
import React from 'react';
import MashPriorityBanner from 'components/MashPriorityBanner/MashPriorityBanner';

interface Props {
  mashReferral: MashReferral;
}
const FinalDecisionCard = ({ mashReferral }: Props): React.ReactElement => {
  return (
    <>
      <MashPriorityBanner
        isPriority={mashReferral.screeningUrgentContactRequired as boolean}
      >
        <div>
          <div className={`lbh-body-s govuk-!-margin-bottom-3 ${s.datetime}`}>
            <MashTag mashReferral={mashReferral} /> submitted{' '}
            {format(new Date(mashReferral.referralCreatedAt), 'HH:00 dd MMM')}
            <span className={`lbh-body-l lbh-!-font-weight-bold  ${s.action}`}>
              <Link href={`mash-referral/${mashReferral.id}/final-decision`}>
                Make decision
              </Link>
            </span>
          </div>
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
              <dt>Screening decision</dt>
              <dd>{mashReferral.screeningDecision}</dd>
            </div>
            <div>
              <dt>Referral category</dt>
              <dd>{mashReferral.initialDecisionReferralCategory}</dd>
            </div>
            <div>
              <Link href="assign">
                <a>Assign</a>
              </Link>
            </div>
          </dl>
        </div>
      </MashPriorityBanner>
      <div className={s.meter}></div>
    </>
  );
};

export default FinalDecisionCard;
