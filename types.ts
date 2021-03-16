export interface Address {
  address: string;
  postcode: string;
  uprn: string;
}

export type AgeContext = 'A' | 'B' | 'C' | undefined;

export interface Allocation {
  id: number;
  caseStatus: 'Closed' | 'Open';
  allocatedWorkerTeam: string;
  allocatedWorker: string;
  allocationStartDate: string;
  allocationEndDate?: string;
  workerType: string;
  personId: number;
  personName: string;
  personDateOfBirth: string;
  personAddress: string;
}

export interface AllocationData {
  allocations: Allocation[];
}

interface CaseFormDataBase {
  mosaic_id: number;
  first_name: string;
  last_name: string;
  worker_email: string;
  form_name_overall: string;
  form_name: string;
  context_flag: AgeContext;
  date_of_event: string | Date;
  timestamp: string | Date;
  note?: string;
  date_of_birth?: string;
  form_url?: string;
  case_note_title?: string;
  case_note_description?: string;
}

export interface AllocationCaseFormData extends CaseFormDataBase {
  form_name_overall: 'API_Allocation';
  allocation_id: number;
  created_by: string;
}

export interface DeallocationCaseFormData extends CaseFormDataBase {
  form_name_overall: 'API_Deallocation';
  allocation_id: number;
  deallocation_reason: string;
  created_by: string;
}

export type CaseFormData =
  | CaseFormDataBase
  | AllocationCaseFormData
  | DeallocationCaseFormData;

export interface Case {
  recordId: string;
  formName: string;
  personId: number;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  officerEmail?: string;
  caseFormUrl?: string;
  caseFormTimestamp?: string;
  dateOfEvent?: string;
  caseFormData: CaseFormData;
}

export interface CaseData {
  cases: Case[] | [];
  nextCursor?: string;
}

export interface ErrorAPI {
  message: string;
}

export interface Resident {
  mosaicId: number;
  firstName: string;
  lastName: string;
  uprn?: string;
  dateOfBirth: string;
  ageContext: AgeContext;
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

export interface Team {
  id: number;
  name: string;
}

export interface Worker {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  allocationCount: number;
}

interface BaseNote {
  id: number;
  type: string;
  createdBy: string;
  createdDate: Date;
  nextReviewDate: Date;
  endedDate?: Date;
  endedBy?: string;
  reviewedDate?: Date;
  reviewedBy?: string;
  notes: string;
  discussedWithManager: string;
  discussedWithManagerDate: Date;
  status: 'closed' | 'open';
  reviews: Array<DisclosedReviewedNote | UndisclosedReviewedNote>;
}

interface DisclosedNote extends BaseNote {
  disclosedWithIndividual: 'Yes';
  disclosedDetails: string;
  disclosedDate: Date;
  disclosedHow: ['verbal', 'written'] | ['verbal'] | ['written'];
}

interface UndisclosedNote extends BaseNote {
  disclosedWithIndividual: 'No';
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
