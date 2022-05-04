import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAllocationsByTeam } from 'utils/api/allocatedWorkers';
import Radios from 'components/Form/Radios/Radios';
import React, { useState } from 'react';
import { Allocation } from 'types';
import s from './TeamAllocationsList.module.scss';
import { getRatingCSSColour } from 'components/PriorityRating/PriorityRating';
import { capitalize } from 'lib/formatters';
import classNames from 'classnames';
import Link from 'next/link';
import { formatDistance, isToday } from 'date-fns';
import { useResident } from 'utils/api/residents';
import Spinner from 'components/Spinner/Spinner';

interface TeamAllocationsListProps {
  teamId: number;
  type: string;
}

interface TeamAllocationProps {
  allocation: Allocation;
  type: string;
}

export const TeamAllocation = ({
  allocation,
  type,
}: TeamAllocationProps): React.ReactElement => {
  const { data: person, error } = useResident(allocation.personId);
  if (error) {
    return <ErrorMessage />;
  }
  if (!person) {
    return <Spinner />;
  }

  if (!allocation.ragRating) {
    allocation.ragRating = 'none';
  }
  const color = getRatingCSSColour(allocation.ragRating.toLowerCase());
  const style = { backgroundColor: color, color: 'white' };
  if (allocation.ragRating == 'medium') {
    style['color'] = 'black';
  }

  const residentLine = (
    <>
      {allocation.ragRating && (
        <span className={s.ragRating} style={style}>
          {capitalize(allocation.ragRating)}
        </span>
      )}
      <span className={s.residentName}>
        <Link href={`/residents/${allocation.personId}/allocations`}>
          <a
            className={classNames('lbh-link lbh-link--no-visited-state')}
            style={{ textDecoration: 'none' }}
          >
            {allocation.personName}
          </a>
        </Link>
      </span>
      <span className={s.residentId}> #{allocation.personId} </span>
    </>
  );

  const allocationDate = new Date(allocation.allocationStartDate);

  const reviewDateBlock = person && person.reviewDate && (
    <span className={s.workerAllocation}>
      <br />
      <b>Review date:</b>
      <span data-testid="dateSpan" className={s.elementValue}>
        {'  '}
        {new Date(person.reviewDate).toLocaleDateString()}
      </span>
    </span>
  );

  const elm =
    type == 'unallocated' ? (
      <>
        {residentLine}
        <div className={s.rowDescription}>
          <span className={s.dateAdded}>
            <b>Added to waitlist:</b>
            <span className={s.elementValue}>
              {' '}
              {allocationDate.toLocaleDateString()}
            </span>
          </span>

          {reviewDateBlock}
        </div>
      </>
    ) : (
      <>
        {residentLine}
        <div className={s.rowDescription}>
          {allocation.teamAllocationStartDate && (
            <>
              <span className={s.workerAllocation}>
                <b>Team allocation: </b>
                <span data-testid="dateSpan" className={s.elementValue}>
                  {isToday(new Date(allocation.teamAllocationStartDate))
                    ? 'Today'
                    : formatDistance(
                        new Date(allocation.teamAllocationStartDate),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )}
                </span>
              </span>
              <br />
            </>
          )}
          <span className={s.workerAllocation}>
            <b>Worker allocation:</b>
            <span data-testid="dateSpan" className={s.elementValue}>
              {' '}
              {allocation.allocatedWorker}
              {' on '}
              {allocationDate.toLocaleDateString()}
              {' ('}
              {isToday(allocationDate)
                ? 'Today'
                : formatDistance(allocationDate, new Date(), {
                    addSuffix: true,
                  })}
              {') '}
            </span>
          </span>
          {reviewDateBlock}
        </div>
      </>
    );

  return elm;
};

const TeamAllocationsList = ({
  teamId,
  type,
}: TeamAllocationsListProps): React.ReactElement => {
  const [sortBy, setSortBy] = useState<string>('rag_rating');

  const {
    data: allocatedTeamData,
    size,
    setSize,
    error,
  } = useAllocationsByTeam(teamId, {
    team_allocation_status: type,
    status: 'open',
    sort_by: sortBy,
  });

  const allocationData = [] as Allocation[];
  for (
    let i = 0;
    allocatedTeamData !== undefined && i < allocatedTeamData.length;
    i++
  ) {
    allocationData.push(...allocatedTeamData[i].allocations);
  }

  const onLastPage =
    !allocatedTeamData?.[allocatedTeamData.length - 1].nextCursor;

  if (error) {
    return <ErrorMessage label="There was a problem with team allocations." />;
  }
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td style={{ paddingRight: '10px', verticalAlign: 'middle' }}>
              Sort by
            </td>
            <td style={{ verticalAlign: 'middle' }}>
              <Radios
                name="sort"
                options={[
                  { value: 'rag_rating', text: 'Priority' },
                  { value: 'date_added', text: 'Date added to team' },
                  { value: 'review_date', text: 'Review date' },
                ]}
                defaultValue={sortBy}
                onChange={(elm) => {
                  setSortBy(elm.target.value);
                }}
                isRadiosInline={true}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <ul style={{ marginTop: '0px' }}>
        {allocationData?.length
          ? allocationData.map((elm) => (
              <li key={elm.id} className={classNames('lbh-body-s', s.listItem)}>
                <TeamAllocation allocation={elm} type={type} />
              </li>
            ))
          : `No ${
              type == 'allocated'
                ? 'active cases'
                : 'elements in the waiting list'
            } for the selected team`}
      </ul>

      {!onLastPage && (
        <button
          className={`govuk-button lbh-button ${s.loadMoreButton}`}
          onClick={() => setSize(size + 1)}
        >
          Load more
        </button>
      )}
    </>
  );
};
export default TeamAllocationsList;
