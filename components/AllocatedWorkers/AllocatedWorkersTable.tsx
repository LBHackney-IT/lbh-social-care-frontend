import { useRouter } from 'next/router';

import Button from 'components/Button/Button';

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
    <div className="lbh-table-header">
      <h3 className="govuk-fieldset__legend--m govuk-custom-text-color govuk-!-margin-top-0">
        ALLOCATED WORKER {index + 1}
      </h3>
      {showDeallocateButton && (
        <Button isSecondary label="Deallocate Worker" route={deallocationUrl} />
      )}
    </div>
    <hr className="govuk-divider" />
    <div></div>
    <dl className="govuk-summary-list">
      {allocatedWorker && (
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Allocated worker:</dt>
          <dd className="govuk-summary-list__value">{allocatedWorker}</dd>
        </div>
      )}
      {allocatedWorkerTeam && (
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Allocated team</dt>
          <dd className="govuk-summary-list__value">{allocatedWorkerTeam}</dd>
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
