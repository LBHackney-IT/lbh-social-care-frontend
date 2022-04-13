import { Allocation } from 'types';
import Link from 'next/link';

interface Props {
  allocations: Allocation[];
}

const AllocationHeader = ({ allocations }: Props): React.ReactElement => {
  const linkTeam = allocations[0].allocatedWorkerTeam && (
    <Link href={`/teams/${allocations[0].allocatedWorkerTeamId}`}>
      <a
        data-testid="teamLink"
        className={`lbh-link lbh-link--no-visited-state`}
      >
        {allocations[0].allocatedWorker
          ? `(${allocations[0].allocatedWorkerTeam})`
          : allocations[0].allocatedWorkerTeam}
      </a>
    </Link>
  );

  const moreLink = allocations?.length > 1 && (
    <Link href={`/residents/${allocations[0].personId}/allocations`}>
      <a
        data-testid="allocationLink"
        className={`lbh-link lbh-link--no-visited-state`}
      >
        {allocations?.length === 2
          ? 'and 1 other'
          : `and ${allocations?.length - 1} others`}
      </a>
    </Link>
  );

  return (
    <span data-testid="allocationHeader">
      {' '}
      Allocated to{' '}
      {allocations[0].allocatedWorker && allocations[0].allocatedWorker}{' '}
      {linkTeam} {moreLink && moreLink}
    </span>
  );
};

export default AllocationHeader;
