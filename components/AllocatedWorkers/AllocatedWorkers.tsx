import { useRouter } from 'next/router';

import AllocatedWorkersTable from 'components/AllocatedWorkers/AllocatedWorkersTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import Button from 'components/Button/Button';
import { useAuth } from 'components/UserContext/UserContext';
import { useAllocatedWorkers } from 'utils/api/allocatedWorkers';

import { Resident, User } from 'types';

interface Props {
  person: Resident;
}

const canUserAllocateWorkerToPerson = (user: User, person: Resident) => {
  if (user.hasAdminPermissions || user.hasDevPermissions) {
    return true;
  }

  if (user.hasChildrenPermissions && person.contextFlag === 'C') {
    // Children's doesn't require `hasAllocationsPermissions`, as anyone can allocate in CFS
    return true;
  }

  if (
    user.hasAdultPermissions &&
    person.contextFlag === 'A' &&
    (user.hasAllocationsPermissions || false)
  ) {
    return true;
  }

  return false;
};

const AllocatedWorkers = ({ person }: Props): React.ReactElement => {
  const { data: { allocations } = {}, error } = useAllocatedWorkers(person.id);
  const { asPath } = useRouter();
  const { user } = useAuth() as { user: User };
  if (!allocations) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div>
      {allocations && (
        <AllocatedWorkersTable
          records={allocations}
          hasAllocationsPermissions={canUserAllocateWorkerToPerson(
            user,
            person
          )}
        />
      )}
      <div>
        <div className="lbh-table-header">
          <h3 className="govuk-fieldset__legend--m govuk-custom-text-color">
            ALLOCATED WORKER {allocations.length + 1}
          </h3>
          {canUserAllocateWorkerToPerson(user, person) && (
            <Button
              label="Allocate worker"
              isSecondary
              route={`${asPath}/allocations/add`}
            />
          )}
        </div>
        <hr className="govuk-divider" />
        <p>
          <i>
            {allocations.length === 0 ? 'Currently unallocated' : 'Optional'}
          </i>
        </p>
      </div>
      {error && <ErrorMessage />}
    </div>
  );
};

export default AllocatedWorkers;
