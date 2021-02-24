export interface Address {
  address: string;
  postcode: string;
  uprn: string;
}

export type AgeContext = 'A' | 'B' | 'C' | undefined;

export interface Allocation {
  id: number;
  caseStatus: 'Closed' | 'Open';
  allocationEndDate?: string;
}

export interface AllocationData {
  allocations: Allocation[];
}

export interface Case {
  recordId: string;
  caseFormData: Record<string, unknown>;
}

export interface CaseData {
  cases: Case[] | [];
  nextCursor?: string;
}

export interface ErrorAPI {
  message: string;
}

export interface Resident {
  mosaicId: string;
  firstName: string;
  lastName: string;
  uprn: string;
  dateOfBirth: string;
  ageContext: string;
  gender: string;
  nationality?: string;
  nhsNumber: string;
  restricted: boolean;
  address?: {
    address: string;
    postcode: string;
    uprn: string;
  };
  phoneNumbers?: Array<{
    number: string;
    type: string;
  }>;
}

export interface ResidentAPI {
  residents: Resident[] | [];
  nextCursor?: string;
}

export interface User {
  name: string;
  email: string;
  permissionFlag: AgeContext;
  hasAdminPermissions: boolean;
  hasAdultPermissions: boolean;
  hasChildrenPermissions: boolean;
  hasAllocationsPermissions?: boolean;
  hasUnrestrictedPermissions?: boolean;
  isAuthorised: boolean;
}
