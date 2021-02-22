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

export interface Resident {
  restricted: boolean;
  address?: {
    address: string;
    postcode: string;
    uprn: string;
  };
}

export interface ResidentAPI {
  residents: Resident[] | [];
  nextCursor?: string;
}

export interface User {
  name: string;
  email: string;
  permissionFlag: 'A' | 'C' | undefined;
  hasAdminPermissions: boolean;
  hasAdultPermissions: boolean;
  hasChildrenPermissions: boolean;
  hasAllocationsPermissions: boolean;
  hasUnrestrictedPermissions: boolean;
  isAuthorised: boolean;
}
