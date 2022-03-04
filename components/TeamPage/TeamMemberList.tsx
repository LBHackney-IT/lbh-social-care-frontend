import { prettyWorkerName } from 'lib/formatters';
import { Worker } from 'types';
import s from './TeamMemberList.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { useAllocationsByWorker } from 'utils/api/allocatedWorkers';
import { formatDate } from 'utils/date';

const prettyWorkerInitials = (worker: Worker): string => {
  if (worker.firstName && worker.lastName)
    return `${worker?.firstName?.[0]?.toUpperCase()}${worker.lastName?.[0]?.toUpperCase()}`;
  return worker.email?.[0].toUpperCase();
};

interface TeamMemberProps {
  user: Worker;
}

const TeamMemberAllocations = ({ user }: TeamMemberProps) => {
  const { data } = useAllocationsByWorker(user.id);

  if (data?.allocations && data?.allocations.length > 0)
    return (
      <div className={s.allocationPanel}>
        <h4>Allocated residents</h4>
        <ul className="lbh-list">
          {data?.allocations.map((alloc) => (
            <li key={alloc.id} className="lbh-body-s">
              <Link href={`/residents/${alloc.personId}/allocations`}>
                {alloc.personName}
              </Link>

              <p className="lbh-body-xs govuk-!-margin-top-1">
                Allocated {formatDate(alloc.allocationStartDate)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );

  return <p className="lbh-body-s">This user has no allocated residents.</p>;
};

const TeamMember = ({ user }: TeamMemberProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <li key={user.id} className={s.listItem} aria-expanded={expanded}>
        <div aria-hidden="true">{prettyWorkerInitials(user)}</div>

        <div>
          <h3>{prettyWorkerName(user)}</h3>
          <p className="lbh-body-s lmf-grey">
            {user.email} · {user.role} · {user.allocationCount || '0'}{' '}
            allocations ·{' '}
            <Link href={`/workers/${user.id}/edit`}>
              <a className="lbh-link--no-visited-state">Edit role/team</a>
            </Link>
          </p>
        </div>

        <button onClick={() => setExpanded(!expanded)}>
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

const TeamMemberList = ({ users }: Props): React.ReactElement => (
  <ul className="lbh-list">
    {users?.map((user) => (
      <TeamMember user={user} key={user.id} />
    ))}
  </ul>
);

export default TeamMemberList;
