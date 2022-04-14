import { prettyWorkerName } from 'lib/formatters';
import { Worker, Allocation } from 'types';
import s from './TeamWorkerList.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { useAllocationsByWorker } from 'utils/api/allocatedWorkers';
import { formatDate } from 'utils/date';
import { formatDistance, subDays } from 'date-fns';

const prettyWorkerInitials = (worker: Worker): string => {
  if (worker.firstName && worker.lastName) {
    const firstNameInitial = worker?.firstName?.[0]?.toUpperCase();
    const lastNameInitial = worker.lastName?.[0]?.toUpperCase();

    return `${firstNameInitial}${lastNameInitial}`;
  }
  return worker.email?.[0].toUpperCase();
};

interface TeamMemberProps {
  user: Worker;
}

const TeamMemberAllocations = ({ user }: TeamMemberProps) => {
  const { data } = useAllocationsByWorker(user.id);

  if (!data) return null;

  if (data?.allocations && data?.allocations.length > 0)
    return (
      <div className={s.allocationPanel}>
        <h3>Allocations</h3>
        <table className="govuk-table lbh-table" style={{ marginTop: '0px' }}>
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th scope="col" className="govuk-table__header">
                Name
              </th>
              <th scope="col" className="govuk-table__header">
                Allocated to worker
              </th>
              <th scope="col" className="govuk-table__header">
                Allocated to team
              </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {data?.allocations.map((allocation: Allocation) => (
              <tr key={allocation.id} className="govuk-table__row">
                <td className="govuk-table__cell">
                  <Link href={`/residents/${allocation.personId}/allocations`}>
                    {allocation.personName}
                  </Link>
                </td>
                <td className="govuk-table__cell">
                  {formatDate(allocation.allocationStartDate)}
                  {' ('}
                  {formatDistance(
                    subDays(new Date(allocation.allocationStartDate), 0),
                    new Date(),
                    { addSuffix: true }
                  )}
                  {')'}
                </td>
                <td className="govuk-table__cell">
                  {allocation.teamAllocationStartDate &&
                    formatDate(allocation.teamAllocationStartDate)}
                  {allocation.teamAllocationStartDate && ' ('}
                  {allocation.teamAllocationStartDate &&
                    formatDistance(
                      subDays(new Date(allocation.teamAllocationStartDate), 0),
                      new Date(),
                      { addSuffix: true }
                    )}
                  {allocation.teamAllocationStartDate && ')'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return <p className="lbh-body-s">This user has no allocated residents.</p>;
};

export const TeamMember = ({ user }: TeamMemberProps): React.ReactElement => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <>
      <li
        data-testid={`team_member_${user.id}`}
        key={user.id}
        className={s.listItem}
        aria-expanded={expanded}
      >
        <div aria-hidden="true">{prettyWorkerInitials(user)}</div>

        <div>
          <h3>{prettyWorkerName(user)}</h3>
          <p className="lbh-body-s lmf-grey">
            {user.role} · {user.allocationCount || '0'} allocations
          </p>
        </div>

        <button
          data-testid={`expand_${user.id}`}
          onClick={() => setExpanded(!expanded)}
        >
          <svg width="20" height="20" viewBox="0 0 13 9" fill="none">
            <path
              d="M1.5 1.5L6.5 6.5L11.5 1.5"
              stroke="#0B0C0C"
              strokeWidth="2"
            ></path>
          </svg>

          <span className="govuk-visually-hidden">Expand allocations</span>
        </button>
      </li>

      {expanded && <TeamMemberAllocations user={user} />}
    </>
  );
};

interface Props {
  users: Worker[];
}

const TeamWorkerList = ({ users }: Props): React.ReactElement => (
  <ul className="lbh-list govuk-!-margin-top-3">
    {users?.map((user) => (
      <TeamMember user={user} key={user.id} />
    ))}
  </ul>
);

export default TeamWorkerList;
