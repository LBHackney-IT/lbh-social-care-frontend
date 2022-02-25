import s from './MashCard.module.scss';
import Link from 'next/link';
import { MashReferral } from 'types';
import { format } from 'date-fns';
import MashTag from 'components/MashTags/MashTags';
import React from 'react';
import MashPriorityBanner from 'components/MashPriorityBanner/MashPriorityBanner';

interface Props {
  mashReferral: MashReferral;
}

const ContactCard = ({ mashReferral }: Props): React.ReactElement => {
  return (
    <>
      <MashPriorityBanner
        isPriority={
          mashReferral.referrer.toUpperCase() === 'POLICE - RED' ||
          mashReferral.referrer.toUpperCase() === 'POLICE - AMBER'
        }
      >
        <div>
          <div className={`lbh-body-s govuk-!-margin-bottom-3 ${s.datetime}`}>
            <MashTag mashReferral={mashReferral} /> submitted{' '}
            {format(new Date(mashReferral.referralCreatedAt), 'HH:00 dd MMM')}
            <span className={`lbh-body-l lbh-!-font-weight-bold  ${s.action}`}>
              <Link href={`mash-referral/${mashReferral.id}/contact-decision`}>
                Work on
              </Link>
            </span>
          </div>
          <hr className={s.line} />
          <dl className={s.stats}>
            <div>
              <dt>Name of client</dt>
              <dd>
                {mashReferral.mashResidents[0].firstName + ' '}
                {mashReferral.mashResidents[0].lastName + ' '}
                {mashReferral.mashResidents.length > 1 &&
                  `+ ${mashReferral.mashResidents.length - 1} `}
                (
                <Link href={mashReferral.referralDocumentURI}>
                  <a>referral</a>
                </Link>
                )
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
          </dl>
        </div>
      </MashPriorityBanner>
      <div className={s.meter}></div>
    </>
  );
};

export default ContactCard;
