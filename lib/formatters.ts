import { mapFormIdToFormDefinition } from 'data/flexibleForms/mapFormIdsToFormDefinition';
import { Allocation, Resident, Case, Worker } from 'types';
import { formatDate } from 'utils/date';
import { truncate } from './utils';

/** return a human-friendly resident name */
export const prettyResidentName = (resident: {
  firstName: string;
  lastName: string;
}): string =>
  `${resident?.firstName?.trim() || ''} ${
    resident?.lastName?.trim() || ''
  }`.trim();

/** nice short summary of a user's allocations, useful for displaying on the resident page, etc */
export const summariseAllocations = (
  allocations: Allocation[]
): string | null => {
  if (allocations?.length === 1)
    return ` · Allocated to ${
      allocations[0].allocatedWorker
        ? `${allocations[0].allocatedWorker}${
            allocations[0].allocatedWorkerTeam
              ? ` (${allocations[0].allocatedWorkerTeam})`
              : ''
          }`
        : allocations[0].allocatedWorkerTeam
    }`;
  if (allocations?.length === 2)
    return ` · Allocated to ${
      allocations[0].allocatedWorker
        ? `${allocations[0].allocatedWorker}${
            allocations[0].allocatedWorkerTeam
              ? ` (${allocations[0].allocatedWorkerTeam})`
              : ''
          }`
        : allocations[0].allocatedWorkerTeam
    } and 1 other`;
  if (allocations?.length > 2)
    return ` · Allocated to ${
      allocations[0].allocatedWorker
        ? `${allocations[0].allocatedWorker}${
            allocations[0].allocatedWorkerTeam
              ? ` (${allocations[0].allocatedWorkerTeam})`
              : ''
          }`
        : allocations[0].allocatedWorkerTeam
    } and ${allocations?.length - 1} others`;
  return null;
};

/** truncated address on one line */
export const prettyAddress = (resident: Resident): string =>
  truncate(`${resident?.address?.address}, ${resident?.address?.postcode}`, 6);

/** return a human-readable title for a case */
export const prettyCaseTitle = (c: Case): string => {
  // handle flexible forms/modern system case notes
  if (c.formType === 'flexible-form') {
    const formName =
      mapFormIdToFormDefinition[c.formName]?.displayName || 'Form';
    const formTitle = c.title;

    return formTitle ? `${formName}: ${formTitle}` : formName;
  }
  // handle workflows, old case notes, google forms, etc
  if (c.formName) return c.formName;
  return 'Unknown record';
};

/** return a human-readable date string for a case */
export const prettyCaseDate = (c: Case): string | null => {
  if (c.dateOfEvent) return formatDate(c.dateOfEvent);
  if (c.caseFormTimestamp) return formatDate(c.caseFormTimestamp);
  return null;
};

/** display human-readable full name for a worker, falling back to the email if not available */
export const prettyWorkerName = (worker: Worker): string => {
  if (worker.firstName && worker.lastName)
    return `${worker.firstName} ${worker.lastName}`;
  return worker.email;
};
