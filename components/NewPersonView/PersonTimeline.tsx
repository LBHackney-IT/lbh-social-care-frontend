import { useState } from 'react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { Case } from 'types';
import useSearch from 'hooks/useSearch';
import CaseLink from 'components/Cases/CaseLink';
import s from './index.module.scss';

type Filter = 'all' | 'major';

interface FilterButtonProps {
  value: Filter;
  children: React.ReactChild;
  filter: Filter;
  setFilter: (value: Filter) => void;
}

const FilterButton = ({
  value,
  children,
  filter,
  setFilter,
}: FilterButtonProps): React.ReactElement => (
  <div className="govuk-radios__item">
    <input
      className="govuk-radios__input"
      id={`filter-${value}`}
      name="filter"
      type="radio"
      value="all"
      checked={filter === value}
      onChange={() => setFilter(value)}
    />
    <label
      className="govuk-radios__label lbh-body-s"
      htmlFor={`filter-${value}`}
    >
      {children}
    </label>
  </div>
);

interface EventProps {
  event: Case;
}

const Event = ({ event }: EventProps): React.ReactElement => {
  const displayDate = event?.dateOfEvent || event?.caseFormTimestamp;
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
      <p className="lbh-body">{displayDate}</p>
      <p className="lbh-body">{event.officerEmail}</p>
    </li>
  );
};

interface Props {
  events: Case[];
  size: number;
  setSize: (size: number) => void;
}

const PersonTimeline = ({
  events,
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

  //   const oldestResult = results?.[results.length - 1];
  //   const oldestTimestamp =
  //     oldestResult?.dateOfEvent || oldestResult?.caseFormTimestamp;

  return (
    <div className={`govuk-grid-row`}>
      {format(new Date('24/06/2021 8:11:26'), 'dd MMM yyyy')}

      <div className="govuk-grid-column-two-thirds">
        {events?.length > 0 && (
          <ol className="lbh-timeline">
            {results?.map((event) => (
              <Event event={event} key={event.recordId} />
            ))}
          </ol>
        )}

        <button
          className="govuk-button lbh-button lbh-button--secondary govuk-!-margin-top-8"
          onClick={() => setSize(size + 1)}
        >
          Load older events
        </button>
      </div>
      <div className="govuk-grid-column-one-third">
        <aside className={s.sticky}>
          <p className="lbh-body-xs">
            Showing {results?.length} events over{' '}
            {/* {oldestTimestamp && formatDistanceToNow(new Date(oldestTimestamp))} */}
          </p>

          <div className="govuk-form-group lbh-form-group">
            <label className="govuk-label lbh-label" htmlFor="query">
              Search
            </label>
            <div className="lbh-search-box" style={{ marginTop: 0 }}>
              <input
                className="govuk-input lbh-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="query"
                name="query"
                type="search"
                placeholder="eg. assessment"
              />
              {searchQuery.length > 0 && (
                <button
                  className="lbh-search-box__action"
                  onClick={() => setSearchQuery('')}
                >
                  <span className="govuk-visually-hidden">Clear search</span>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M-0.0501709 1.36379L1.36404 -0.050415L12.6778 11.2633L11.2635 12.6775L-0.0501709 1.36379Z"
                      fill="#0B0C0C"
                    />
                    <path
                      d="M11.2635 -0.050293L12.6778 1.36392L1.36404 12.6776L-0.0501709 11.2634L11.2635 -0.050293Z"
                      fill="#0B0C0C"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

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
