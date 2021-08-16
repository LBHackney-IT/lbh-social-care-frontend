import { mapIdToType } from 'data/flexibleForms/mapFormIdsToDisplayName';
import Link from 'next/link';
import { Case } from 'types';
import { generateInternalLink as generateLegacyUrl } from 'utils/urls';
import s from './index.module.scss';

interface Props {
  event: Case;
}

const EventLink = ({ event }: Props): React.ReactElement => {
  // 1. handle flexible forms

  if (event.formType === 'flexible-form') {
    const formName = mapIdToType[event.formName] || 'Form';
    const formTitle = event.title ? ` - ${event.title}` : '';

    return (
      <Link href={`/people/${event.personId}/submissions/${event.recordId}`}>
        <a className={`lbh-link ${s.eventLink}`}>
          {formName}
          {formTitle}
        </a>
      </Link>
    );
  }

  // 2. handle external/google forms
  if (event.caseFormUrl)
    return (
      <a
        href={event.caseFormUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={`lbh-link ${s.eventLink}`}
      >
        {event.formName}
      </a>
    );

  // 3. handle legacy forms
  const legacyUrl = generateLegacyUrl(event);
  if (legacyUrl)
    return (
      <Link href={legacyUrl}>
        <a className={`lbh-link ${s.eventLink}`}>{event.formName}</a>
      </Link>
    );

  // 4. handle anything else
  return <>{event.formName || 'Unknown event'}</>;
};

export default EventLink;
