import { Allocation, Resident } from 'types';
import { truncate } from './utils';

/** return a human-friendly resident name */
export const prettyResidentName = (resident: Resident): string =>
  `${resident.firstName} ${resident.lastName}`;

/** nice short summary of a user's allocations, useful for displaying on the resident page, etc */
export const summariseAllocations = (
  allocations: Allocation[]
): string | null => {
  if (allocations?.length === 1)
    return `Allocated to ${allocations[0].allocatedWorker}`;
  if (allocations?.length === 2)
    return `Allocated to ${allocations[0].allocatedWorker} and 1 other`;
  if (allocations?.length > 2)
    return `Allocated to ${allocations[0].allocatedWorker} and ${
      allocations?.length - 1
    } others`;
  return null;
};

/** truncated address on one line */
export const prettyAddress = (resident: Resident): string =>
  truncate(`${resident?.address?.address}, ${resident?.address?.postcode}`, 6);
