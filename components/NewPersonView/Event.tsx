import { format } from 'date-fns';
import { Case } from 'types';
import CaseLink from 'components/Cases/CaseLink';
import { normaliseDateToISO } from 'utils/date';
import { isMajorEvent } from './PersonTimeline';

const safelyFormat = (rawDate: string): string => {
  try {
    return format(
      new Date(rawDate),
      rawDate.includes('T') ? 'dd MMM yyyy K.mm aaa' : 'dd MMM yyyy'
    );
  } catch (e) {
    return rawDate;
  }
};

interface Props {
  event: Case;
}

const Event = ({ event }: Props): React.ReactElement => {
  const displayDate = normaliseDateToISO(
    String(event?.dateOfEvent || event?.caseFormTimestamp)
  );

  const displayName = event?.formName || event?.caseFormData?.form_name_overall;

  return (
    <li
      className={`lbh-timeline__event ${
        !isMajorEvent(event) && `lbh-timeline__event--minor`
      }`}
    >
      <h3 className="lbh-heading-h3">
        <CaseLink
          formName={event.formName}
          externalUrl={event.caseFormUrl}
          caseFormData={event.caseFormData}
          recordId={event.recordId}
          personId={event.personId}
        >
          {displayName}
        </CaseLink>
      </h3>

      <p className="lbh-body govuk-!-margin-top-1">
        {safelyFormat(displayDate)}
      </p>
      <p className="lbh-body govuk-!-margin-top-1">{event.officerEmail}</p>
    </li>
  );
};

export default Event;
