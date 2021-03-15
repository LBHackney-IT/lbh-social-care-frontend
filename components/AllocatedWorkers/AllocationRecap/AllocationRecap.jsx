import PropTypes from 'prop-types';
import Link from 'next/link';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useResidentAllocation } from 'utils/api/allocatedWorkers';
import { useCase } from 'utils/api/cases';

const AllocationRecap = ({ personId, allocationId, recordId }) => {
  const { data: allocation, error: allocationError } = useResidentAllocation(
    personId,
    allocationId
  );
  const { data: record, error: recordError } = useCase(recordId);
  if (recordError || allocationError) {
    return <ErrorMessage />;
  }
  if (!allocation || !record) {
    return <Spinner />;
  }
  const isDeallocation =
    record.caseFormData.form_name_overall === 'API_Deallocation';
  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Worker {isDeallocation ? 'deallocated' : 'allocated'}
      </h1>
      <p className="govuk-body govuk-!-margin-top-6">
        <b>Person</b>:{' '}
        <Link href={`/people/${allocation.personId}`}>
          {allocation.personName}
        </Link>
      </p>
      <div className="govuk-!-margin-top-6">
        <h2 className="gov-weight-lighter">Allocations details</h2>
        <dl className="govuk-summary-list govuk-summary-list--no-border">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Worker</dt>
            <dd className="govuk-summary-list__value">
              {allocation.allocatedWorker}, {allocation.workerType},{' '}
              {allocation.allocatedWorkerTeam}
            </dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Allocated date</dt>
            <dd className="govuk-summary-list__value">
              {new Date(allocation.allocationStartDate).toLocaleDateString(
                'en-GB'
              )}
            </dd>
          </div>
          {allocation.allocationEndDate && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Deallocated date</dt>
              <dd className="govuk-summary-list__value">
                {new Date(allocation.allocationEndDate).toLocaleDateString(
                  'en-GB'
                )}
              </dd>
            </div>
          )}
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">
              {isDeallocation ? 'Deallocated' : 'Allocated'} by
            </dt>
            <dd className="govuk-summary-list__value">
              {record.caseFormData.created_by}
            </dd>
          </div>
        </dl>
      </div>
      {isDeallocation && (
        <>
          <h2 className="gov-weight-lighter">Reason for worker deallocation</h2>
          <p className="govuk-body">
            {record.caseFormData.deallocation_reason}
          </p>
        </>
      )}
    </>
  );
};

AllocationRecap.propTypes = {
  personId: PropTypes.string.isRequired,
  allocationId: PropTypes.string.isRequired,
  recordId: PropTypes.string.isRequired,
};

export default AllocationRecap;
