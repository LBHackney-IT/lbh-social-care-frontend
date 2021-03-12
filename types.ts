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
  uprn?: string;
  dateOfBirth: string;
  ageContext: string;
  gender: string;
  nationality?: string;
  nhsNumber: string;
  restricted?: boolean;
  address?: {
    address: string;
    postcode: string;
    uprn?: string;
  };
  phoneNumber?: Array<{
    phoneNumber: string;
    phoneType: string;
  }>;
}

/**
 * This should be what the BE is going to return
 */
export interface ExtendedResident extends Resident {
  otherNames?: Array<{
    firstName: string;
    lastName: string;
  }>;
  firstLanguage?: string;
  religion?: string;
  dateOfDeath?: string;
  sexualOrientation?: string;
  ethnicity?: string;
  email?: string;
  preferredMethodOfContact?: string;
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

interface BaseNote {
  id: number;
  type: string;
  createdBy: string;
  createdDate: Date;
  nextReviewDate: Date;
  endedDate?: Date;
  endedBy?: string;
  notes: string;
  discussedWithManager: string;
  discussedWithManagerDate: Date;
  status: 'closed' | 'open';
  reviews: Array<DisclosedReviewedNote | UndisclosedReviewedNote>;
}

interface DisclosedNote extends BaseNote {
  disclosedWithIndividual: true;
  disclosedDetails: string;
  disclosedDate: Date;
  disclosedHow: ['verbal', 'written'] | ['verbal'] | ['written'];
}

interface UndisclosedNote extends BaseNote {
  disclosedWithIndividual: false;
  disclosedDetails: string;
}

interface ReviewedNote {
  reviewedDate: Date;
  reviewdBy: Date;
  notes: string;
  discussedWithManager: string;
  discussedWithManagerDate: Date;
}

interface DisclosedReviewedNote extends ReviewedNote {
  disclosedWithIndividual: true;
  disclosedDetails: string;
  disclosedDate: Date;
  disclosedHow: ['verbal', 'written'] | ['verbal'] | ['written'];
}

interface UndisclosedReviewedNote extends ReviewedNote {
  disclosedWithIndividual: false;
  disclosedDetails: string;
}

export type WarningNote = DisclosedNote | UndisclosedNote;

export interface WarningNotes {
  notes: Array<WarningNote>;
}
