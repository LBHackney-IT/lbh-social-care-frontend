import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Case } from 'types';
import useSearch from 'hooks/useSearch';
import s from './index.module.scss';
import FilterButton, { Filter } from './FilterButton';
import { Submission } from 'data/flexibleForms/forms.types';
import SearchBox from 'components/SubmissionsTable/SearchBox';
import UnfinishedSubmissionsEvent from './UnfinishedSubmissions';
import { normaliseDateToISO } from 'utils/date';
import Event from './Event';
import MINOR_FORMS from 'data/minorForms';

/** for all possible kinds of submission/case/record, see if it's major or not */
export const isMajorEvent = (event: Case): boolean =>
  !(
    MINOR_FORMS.includes(event?.formName) ||
    MINOR_FORMS.includes(event?.caseFormData?.form_name_overall)
  );

interface Props {
  events: Case[];
  unfinishedSubmissions?: Submission[];
  size: number;
  setSize: (size: number) => void;
  onLastPage: boolean;
}

const PersonTimeline = ({
  events,
  unfinishedSubmissions,
  size,
  setSize,
  onLastPage,
}: Props): React.ReactElement => {
  const [filter, setFilter] = useState<Filter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // apply filtering and searching
  const results = useSearch(
    searchQuery,
    events?.filter((event) =>
      filter === 'major' ? isMajorEvent(event) : true
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
            {unfinishedSubmissions && unfinishedSubmissions.length > 0 && (
              <UnfinishedSubmissionsEvent submissions={unfinishedSubmissions} />
            )}

            {results?.map((event) => (
              <Event event={event} key={event.recordId} />
            ))}
          </ol>
        )}

        {!onLastPage && (
          <button
            className={`govuk-button lbh-button lbh-button--secondary govuk-!-margin-top-8 ${s.loadMoreButton}`}
            onClick={() => setSize(size + 1)}
          >
            Load older events
          </button>
        )}
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
