import { useRouter } from 'next/router';

import AllocatedWorkersTable from 'components/AllocatedWorkers/AllocatedWorkersTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import Button from 'components/Button/Button';
import { useAuth } from 'components/UserContext/UserContext';
import { useAllocatedWorkers } from 'utils/api/allocatedWorkers';

import { User } from 'types';

interface Props {
  id: number;
}

const AllocatedWorkers = ({ id }: Props): React.ReactElement => {
  const { data: { allocations } = {}, error } = useAllocatedWorkers(id);
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
          hasAllocationsPermissions={Boolean(user.hasAllocationsPermissions)}
        />
      )}
      <div>
        <div className="lbh-table-header">
          <h3 className="govuk-fieldset__legend--m govuk-custom-text-color">
            ALLOCATED WORKER {allocations.length + 1}
          </h3>
          {user.hasAllocationsPermissions && (
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
