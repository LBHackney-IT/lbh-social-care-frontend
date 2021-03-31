import { useRouter } from 'next/router';
import Button from 'components/Button/Button';
import Collapsible from 'components/Collapsible/Collapsible';
import { Allocation } from 'types';

interface EntryProps extends Allocation {
  deallocationUrl: string;
  index: number;
  showDeallocateButton: boolean;
}

const AllocatedWorkersEntry = ({
  allocatedWorkerTeam,
  allocatedWorker,
  allocationStartDate,
  allocationEndDate,
  workerType,
  index,
  showDeallocateButton,
  deallocationUrl,
}: EntryProps): React.ReactElement => (
  <>
    <Collapsible headline={`Allocated worker ${index + 1}`}>
      <>
        <dl className="govuk-summary-list  lbh-summary-list">
          {allocatedWorker && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Worker</dt>
              <dd className="govuk-summary-list__value">{allocatedWorker}</dd>
            </div>
          )}
          {allocatedWorkerTeam && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Team</dt>
              <dd className="govuk-summary-list__value">
                {allocatedWorkerTeam}
              </dd>
            </div>
          )}
          {workerType && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Role</dt>
              <dd className="govuk-summary-list__value">{workerType}</dd>
            </div>
          )}
          {allocationStartDate && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Start date</dt>
              <dd className="govuk-summary-list__value">
                {new Date(allocationStartDate).toLocaleDateString('en-GB')}
              </dd>
            </div>
          )}
          {allocationEndDate && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">End date</dt>
              <dd className="govuk-summary-list__value">
                {new Date(allocationEndDate).toLocaleDateString('en-GB')}
              </dd>
            </div>
          )}
        </dl>
        {showDeallocateButton && (
          <Button
            isSecondary
            label="Deallocate Worker"
            route={deallocationUrl}
          />
        )}
      </>
    </Collapsible>
  </>
);

export interface Props {
  records: Allocation[];
  hasAllocationsPermissions: boolean;
}

const AllocatedWorkersTable = ({
  records,
  hasAllocationsPermissions,
}: Props): React.ReactElement => {
  const { asPath } = useRouter();
  return (
    <div>
      {records.map((record, index) => (
        <AllocatedWorkersEntry
          key={record.id}
          index={index}
          showDeallocateButton={hasAllocationsPermissions}
          deallocationUrl={`${asPath}/allocations/${record.id}/remove`}
          {...record}
        />
      ))}
    </div>
  );
};

export default AllocatedWorkersTable;
