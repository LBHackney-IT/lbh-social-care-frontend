import { mapFormIdToFormDefinition } from 'data/flexibleForms/mapFormIdsToFormDefinition';
import { useAppConfig } from 'lib/appConfig';
import Link from 'next/link';
import { Case } from 'types';
import { generateInternalLink as generateLegacyUrl } from 'utils/urls';
import s from './index.module.scss';
interface Props {
  event: Case;
}

const EventLink = ({ event }: Props): React.ReactElement => {
  const { getConfigValue } = useAppConfig();

  // 1. handle flexible forms
  if (event.formType === 'flexible-form') {
    const formName =
      mapFormIdToFormDefinition[event.formName]?.displayName || 'Form';
    const formTitle = event.title ? ` - ${event.title}` : '';

    if (!event.deleted) {
      return (
        <Link href={`/people/${event.personId}/submissions/${event.recordId}`}>
          <a className={`lbh-link ${s.eventLink}`}>
            {formName}
            {formTitle}
          </a>
        </Link>
      );
    } else {
      return (
        <>
          <span>
            {formName} {formTitle}{' '}
          </span>
          <Link
            href={`/people/${event.personId}/submissions/${event.recordId}`}
          >
            <a className={`lbh-link ${s.eventLink}`}>(deleted record)</a>
          </Link>
        </>
      );
    }
  }

  // 2. handle workflows
  if (event?.caseFormData?.workflowId)
    return (
      <a
        href={`${getConfigValue('workflowsPilotUrl') as string}/workflows/${
          event.caseFormData.workflowId
        }`}
      >
        {event.formName}
      </a>
    );

  // 3. handle external/google forms
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

  // 4. handle legacy forms
  const legacyUrl = generateLegacyUrl(event);
  if (legacyUrl)
    return (
      <Link href={legacyUrl}>
        <a className={`lbh-link ${s.eventLink}`}>{event.formName}</a>
      </Link>
    );

  // 5. handle anything else
  return <>{event.formName || 'Unknown event'}</>;
};

export default EventLink;
