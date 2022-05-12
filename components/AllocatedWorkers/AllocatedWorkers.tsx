import { useRouter } from 'next/router';
import AllocatedWorkersTable from 'components/AllocatedWorkers/AllocatedWorkersTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useAuth } from 'components/UserContext/UserContext';
import { useAllocatedWorkers } from 'utils/api/allocatedWorkers';
import { Resident, User } from 'types';
import { canUserAllocateWorkerToPerson } from '../../lib/permissions';
import Link from 'next/link';

interface Props {
  person: Resident;
}

const AllocatedWorkers = ({ person }: Props): React.ReactElement => {
  const { data: { allocations } = {}, error } = useAllocatedWorkers(person.id);
  const { asPath } = useRouter();
  const { user } = useAuth() as { user: User };
  if (!allocations) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage label={error.message} />;
  }

  return (
    <div>
      {allocations && allocations.length > 0 ? (
        <AllocatedWorkersTable
          records={allocations}
          hasAllocationsPermissions={canUserAllocateWorkerToPerson(
            user,
            person
          )}
        />
      ) : (
        <p>No one is allocated to this person</p>
      )}

      {canUserAllocateWorkerToPerson(user, person) && (
        <Link href={`${asPath}/add`}>
          <a className="govuk-button lbh-button lbh-button--secondary lbh-button--add">
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M6.94 0L5 0V12H6.94V0Z" />
              <path d="M12 5H0V7H12V5Z" />
            </svg>
            {allocations.length > 0
              ? 'Allocate someone else'
              : 'Allocate someone'}
          </a>
        </Link>
      )}

      {error && <ErrorMessage />}
    </div>
  );
};

export default AllocatedWorkers;
