import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAllocationsByWorker } from 'utils/api/allocatedWorkers';
import Radios from 'components/Form/Radios/Radios';
import React, { useState } from 'react';
import { Allocation } from 'types';
import s from './WorkerAllocations.module.scss';
import { getRatingCSSColour } from 'components/PriorityRating/PriorityRating';
import { capitalize } from 'lib/formatters';
import classNames from 'classnames';
import Link from 'next/link';
import Spinner from 'components/Spinner/Spinner';
import { formatDistance, isToday } from 'date-fns';
import { useResident } from 'utils/api/residents';

interface WorkerAllocationssListProps {
  workerId: number;
}

interface WorkerAllocationsProps {
  allocation: Allocation;
}

export const WorkerAllocations = ({
  allocation,
}: WorkerAllocationsProps): React.ReactElement => {
  if (!allocation.ragRating) allocation.ragRating = 'none';

  const { data: person, error } = useResident(allocation.personId);
  if (error) {
    return <ErrorMessage label={error.message} />;
  }
  if (!person) {
    return <Spinner />;
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

  return (
    <>
      {residentLine}
      <div className={s.rowDescription}>
        {allocation.teamAllocationStartDate && (
          <>
            <span className={s.workerAllocation}>
              <b>Team allocation: </b>
              <span data-testid="dateSpan" className={s.elementValue}>
                {allocationDate.toLocaleDateString()}
                {' ('}
                {isToday(new Date(allocation.teamAllocationStartDate))
                  ? 'Today'
                  : formatDistance(
                      new Date(allocation.teamAllocationStartDate),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                {') '}
              </span>
            </span>
            <br />
          </>
        )}

        <span className={s.workerAllocation}>
          <b>Date allocated:</b>
          <span data-testid="dateSpan" className={s.elementValue}>
            {'  '}
            {allocationDate.toLocaleDateString()}
            {' ('}
            {isToday(allocationDate)
              ? 'Today'
              : formatDistance(allocationDate, new Date(), { addSuffix: true })}
            {') '}
          </span>
        </span>

        {person && person.reviewDate && (
          <span className={s.workerAllocation}>
            <br />
            <b>Review date:</b>
            <span data-testid="dateSpan" className={s.elementValue}>
              {'  '}
              {new Date(person.reviewDate).toLocaleDateString()}
            </span>
          </span>
        )}
      </div>
    </>
  );
};

const WorkerAllocationssList = ({
  workerId,
}: WorkerAllocationssListProps): React.ReactElement => {
  const [sortBy, setSortBy] = useState<string>('rag_rating');

  const { data: allocatedWorkerData, error } = useAllocationsByWorker(
    workerId,
    {
      sort_by: sortBy,
    }
  );
  if (error) {
    return <ErrorMessage label={error.message} />;
  }
  if (!allocatedWorkerData) {
    return <Spinner />;
  }
  return (
    <>
      {allocatedWorkerData?.allocations?.length ? (
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
      ) : (
        ''
      )}
      <ul style={{ marginTop: '0px' }}>
        {allocatedWorkerData?.allocations?.length ? (
          allocatedWorkerData.allocations.map((elm: Allocation) => (
            <li key={elm.id} className={classNames('lbh-body-s', s.listItem)}>
              <WorkerAllocations allocation={elm} />
            </li>
          ))
        ) : (
          <p>No people are assigned to you</p>
        )}
      </ul>
    </>
  );
};
export default WorkerAllocationssList;
