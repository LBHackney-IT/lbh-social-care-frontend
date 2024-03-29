import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Case } from 'types';
import s from './index.module.scss';
import UnfinishedSubmissionsEvent from './UnfinishedSubmissions';
import { normaliseDateToISO } from 'utils/date';
import Event from './Event';
import MAJOR_FORMS from 'data/majorForms';
import cx from 'classnames';
import { isAdminOrDev } from 'lib/permissions';
import { useAuth } from 'components/UserContext/UserContext';
import { User } from 'types';
import { ConditionalFeature } from 'lib/feature-flags/feature-flags';

/** for all possible kinds of submission/case/record, see if it's major or not */
export const isMajorEvent = (event: Case): boolean =>
  MAJOR_FORMS.includes(event?.formName) ||
  MAJOR_FORMS.includes(event?.caseFormData?.form_name_overall);

const safelyFormatDistanceToNow = (rawDate: string): string => {
  try {
    return formatDistanceToNow(new Date(rawDate));
  } catch (e) {
    return rawDate;
  }
};

interface Props {
  events: Case[];
  size: number;
  setSize: (size: number) => void;
  onLastPage: boolean;
  personId: number;
  displayDeletedCases?: boolean;
  setDisplayDeletedCases?: (
    value: boolean | ((prevVar: boolean) => boolean)
  ) => void;
  deletedRecordsCount?: number;
}

const PersonTimeline = ({
  events,
  size,
  setSize,
  onLastPage,
  personId,
  displayDeletedCases,
  setDisplayDeletedCases,
  deletedRecordsCount,
}: Props): React.ReactElement => {
  const { user } = useAuth() as { user: User };

  const oldestResult = events?.[events.length - 1];
  const oldestTimestamp = normaliseDateToISO(
    String(oldestResult?.dateOfEvent || oldestResult?.caseFormTimestamp)
  );

  return (
    <div className={`govuk-grid-row ${s.outer}`}>
      <div className="govuk-grid-column-two-thirds">
        {events?.length > 0 && (
          <ol
            className={cx('lbh-timeline', {
              [s.timelineContinues]: !onLastPage,
            })}
          >
            <UnfinishedSubmissionsEvent personId={personId} />

            {events?.map((event) => (
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
          {events.length > 0 ? (
            <p className="lbh-body-xs">
              Showing {events?.length} events over{' '}
              {oldestTimestamp && safelyFormatDistanceToNow(oldestTimestamp)}
            </p>
          ) : (
            <p className="lbh-body-xs">No events match your search</p>
          )}
          <ConditionalFeature name="case-notes-deletion">
            {isAdminOrDev(user) && setDisplayDeletedCases ? (
              displayDeletedCases ? (
                <a
                  onClick={() => setDisplayDeletedCases(false)}
                  href="#"
                  className="lbh-link lbh-body-s"
                >
                  Hide deleted records{' '}
                  {deletedRecordsCount != null
                    ? `(${deletedRecordsCount})`
                    : ''}
                </a>
              ) : (
                <a
                  onClick={() => setDisplayDeletedCases(true)}
                  href="#"
                  className="lbh-link lbh-body-s"
                >
                  Show deleted records{' '}
                  {deletedRecordsCount != null
                    ? `(${deletedRecordsCount})`
                    : ''}
                </a>
              )
            ) : (
              <></>
            )}
          </ConditionalFeature>
        </aside>
      </div>
    </div>
  );
};

export default PersonTimeline;
