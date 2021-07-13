import React, { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Case } from 'types';
import useSearch from 'hooks/useSearch';
import CaseLink from 'components/Cases/CaseLink';
import s from './index.module.scss';
import FilterButton, { Filter } from './FilterButton';
import { Submission } from 'data/flexibleForms/forms.types';
import SearchBox from 'components/SubmissionsTable/SearchBox';
import UnfinishedSubmissionsEvent from './UnfinishedSubmissions';
import { normaliseDateToISO } from 'utils/date';

interface EventProps {
  event: Case;
}

const Event = ({ event }: EventProps): React.ReactElement => {
  const displayDate = normaliseDateToISO(
    String(event?.dateOfEvent || event?.caseFormTimestamp)
  );

  return (
    <li
      className={`lbh-timeline__event ${
        event.formName === 'Child Case Note' && `lbh-timeline__event--minor`
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
          {event.formName}
        </CaseLink>
      </h3>
      {}
      <p className="lbh-body">
        {format(
          new Date(displayDate),
          displayDate.includes('T') ? 'dd MMM yyyy K.mm aaa' : 'dd MMM yyyy'
        )}
      </p>
      <p className="lbh-body">{event.officerEmail}</p>
    </li>
  );
};

interface Props {
  events: Case[];
  unfinishedSubmissions?: Submission[];
  size: number;
  setSize: (size: number) => void;
}

const PersonTimeline = ({
  events,
  unfinishedSubmissions,
  size,
  setSize,
}: Props): React.ReactElement => {
  const [filter, setFilter] = useState<Filter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // apply filtering and searching
  const results = useSearch(
    searchQuery,
    events?.filter((event) =>
      filter === 'major' ? event.formName !== 'Child Case Note' : true
    ),
    ['formName', 'officerEmail']
  );

  const oldestResult = results?.[results.length - 1];
  const oldestTimestamp = normaliseDateToISO(
    String(oldestResult?.dateOfEvent || oldestResult?.caseFormTimestamp)
  );

  return (
    <div className={`govuk-grid-row ${s.outer}`}>
      <div className="govuk-grid-column-two-thirds">
        {events?.length > 0 && (
          <ol className="lbh-timeline">
            {unfinishedSubmissions && (
              <UnfinishedSubmissionsEvent submissions={unfinishedSubmissions} />
            )}

            {results?.map((event) => (
              <Event event={event} key={event.recordId} />
            ))}
          </ol>
        )}

        <button
          className={`govuk-button lbh-button lbh-button--secondary govuk-!-margin-top-8 ${s.loadMoreButton}`}
          onClick={() => setSize(size + 1)}
        >
          Load older events
        </button>
      </div>
      <div className="govuk-grid-column-one-third">
        <aside className={s.sticky}>
          <p className="lbh-body-xs">
            Showing {results?.length} events over{' '}
            {oldestTimestamp && formatDistanceToNow(new Date(oldestTimestamp))}
          </p>

          <SearchBox
            label="Search for matching events and records"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <div className="govuk-radios govuk-radios--small lbh-radios">
            <FilterButton filter={filter} setFilter={setFilter} value="all">
              All events
            </FilterButton>
            <FilterButton filter={filter} setFilter={setFilter} value="major">
              Major events only
            </FilterButton>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PersonTimeline;
