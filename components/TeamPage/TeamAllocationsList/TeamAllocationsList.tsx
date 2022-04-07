import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAllocationsByTeam } from 'utils/api/allocatedWorkers';
import Radios from 'components/Form/Radios/Radios';
import React, { useState } from 'react';
import { Allocation } from 'types';
import s from './TeamAllocationsList.module.scss';
import { getRatingColour } from 'components/PriorityRating/PriorityRating';
import { capitalize } from 'utils/strings';
import classNames from 'classnames';
import Link from 'next/link';

interface TeamAllocationsListProps {
  teamId: number;
  type: string;
}

interface TeamAllocationProps {
  allocation: Allocation;
  type: string;
}

export const TeamAllocation = ({ allocation, type }: TeamAllocationProps) => {
  const color = getRatingColour(allocation.ragRating);
  const style = { backgroundColor: color };

  const residentLine = (
    <>
      {allocation.ragRating && (
        <span className={s.ragRating} style={style}>
          {capitalize(allocation.ragRating)}
        </span>
      )}
      <span className={s.residentName}>
        <Link href={`/residents/${allocation.personId}`}>
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

  const elm =
    type == 'unallocated' ? (
      <>
        {residentLine}
        <div className={s.rowDescription}>
          <span className={s.dateAdded}>
            <b>Added to waitlist:</b>
            <span className={s.elementValue}>
              {' '}
              {new Date(allocation.allocationStartDate).toLocaleDateString()}
            </span>
          </span>
        </div>
      </>
    ) : (
      <>
        {residentLine}
        <div className={s.rowDescription}>
          <span className={s.dateAdded}>
            <b>Team allocation:</b>
            <span className={s.elementValue}>
              {' '}
              {new Date(allocation.allocationStartDate).toLocaleDateString()}
            </span>
          </span>
          <br />
          <span className={s.workerAllocation}>
            <b>Worker allocation:</b>
            <span className={s.elementValue}>
              {' '}
              {allocation.allocatedWorker}
            </span>
          </span>
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
