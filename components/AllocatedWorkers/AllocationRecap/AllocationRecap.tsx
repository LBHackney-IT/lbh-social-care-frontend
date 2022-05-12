import Link from 'next/link';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useResidentAllocation } from 'utils/api/allocatedWorkers';
import { useCase } from 'utils/api/cases';

import {
  CaseFormData,
  AllocationCaseFormData,
  DeallocationCaseFormData,
} from 'types';

interface Props {
  personId: number;
  allocationId: number;
  recordId: string;
}

const isAllocationCase = (
  caseFormData: CaseFormData
): caseFormData is AllocationCaseFormData =>
  (caseFormData as AllocationCaseFormData).form_name_overall ===
  'API_Allocation';

const isDeallocationCase = (
  caseFormData: CaseFormData
): caseFormData is DeallocationCaseFormData =>
  (caseFormData as DeallocationCaseFormData).form_name_overall ===
  'API_Deallocation';

const AllocationRecap = ({
  personId,
  allocationId,
  recordId,
}: Props): React.ReactElement => {
  const { data: allocation, error: allocationError } = useResidentAllocation(
    personId,
    allocationId
  );
  const { data: { caseFormData } = {}, error: recordError } = useCase(
    recordId,
    personId
  );
  if (recordError || allocationError) {
    return (
      <ErrorMessage
        label={recordError ? recordError.message : allocationError?.message}
      />
    );
  }
  if (!allocation || !caseFormData) {
    return <Spinner />;
  }
  if (!isDeallocationCase(caseFormData) && !isAllocationCase(caseFormData)) {
    return (
      <ErrorMessage label="Case must be either of allocation or deallocation type" />
    );
  }
  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        {caseFormData.form_name
          ? caseFormData.form_name
          : `Worker ${
              isDeallocationCase(caseFormData) ? 'deallocated' : 'allocated'
            }`}
      </h1>
      <p className="govuk-body govuk-!-margin-top-6">
        <b>Person</b>:{' '}
        <Link href={`/residents/${allocation.personId}`}>
          {allocation.personName}
        </Link>
      </p>
      <div className="govuk-!-margin-top-6">
        <h2 className="gov-weight-lighter">Allocations details</h2>
        <dl className="govuk-summary-list govuk-summary-list--no-border">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">
              {allocation.allocatedWorker ? 'Worker' : 'Team'}
            </dt>
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
              {isDeallocationCase(caseFormData) ? 'Deallocated' : 'Allocated'}{' '}
              by
            </dt>
            <dd className="govuk-summary-list__value">
              {caseFormData.created_by}
            </dd>
          </div>
        </dl>
      </div>
      {isDeallocationCase(caseFormData) && (
        <>
          <h2 className="gov-weight-lighter">Reason for deallocation</h2>
          <p className="govuk-body">{caseFormData.deallocation_reason}</p>
        </>
      )}
    </>
  );
};

export default AllocationRecap;
