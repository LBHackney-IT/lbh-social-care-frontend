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
      <h3 className="lbh-heading-h2 section-heading">
        Allocated worker {allocations.length + 1}
      </h3>
      <p className="lbh-body">
        {allocations.length === 0
          ? 'No one is allocated right now.'
          : 'Optional'}
      </p>
      {user.hasAllocationsPermissions && (
        <Button
          label="Allocate worker"
          isSecondary
          route={`${asPath}/allocations/add`}
        />
      )}
      {error && <ErrorMessage />}
    </div>
  );
};

export default AllocatedWorkers;
