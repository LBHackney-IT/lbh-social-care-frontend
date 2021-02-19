import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Button from 'components/Button/Button';

const AllocatedWorkersEntry = ({
  allocatedWorkerTeam,
  allocatedWorker,
  allocationStartDate,
  allocationEndDate,
  workerType,
  index,
  showDeallocateButton,
  deallocationUrl,
}) => (
  <>
    <div className="lbh-table-header">
      <h3 className="govuk-fieldset__legend--m govuk-custom-text-color govuk-!-margin-top-0">
        Allocated worker {index + 1}
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

AllocatedWorkersEntry.propTypes = {
  allocatedWorker: PropTypes.string.isRequired,
  allocationStartDate: PropTypes.string.isRequired,
  allocationEndDate: PropTypes.string,
  allocatedWorkerTeam: PropTypes.string,
  workerType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  showDeallocateButton: PropTypes.bool.isRequired,
  deallocationUrl: PropTypes.string.isRequired,
};

const AllocatedWorkersTable = ({ records, hasAllocationsPermissions }) => {
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

AllocatedWorkersTable.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      allocatedWorkerTeam: PropTypes.string,
      allocatedWorker: PropTypes.string.isRequired,
      allocationStartDate: PropTypes.string.isRequired,
      allocationEndDate: PropTypes.string,
      workerType: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      personId: PropTypes.number.isRequired,
    })
  ).isRequired,
  hasAllocationsPermissions: PropTypes.bool.isRequired,
};

export default AllocatedWorkersTable;
