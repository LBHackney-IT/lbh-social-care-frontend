import { AxiosError } from 'axios';

export type ErrorAPI = AxiosError;

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
  is_historical?: true | false;
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

export interface WarningNoteCaseFormData extends CaseFormDataBase {
  form_name_overall: 'API_WarningNote';
  warning_note_id: number;
}

export interface HistoricCaseData {
  title: string;
  formName?: string;
  content?: string;
  officerName?: string;
  officerEmail?: string;
  dateOfEvent: string;
}

export interface HistoricVisitData {
  visitId: number;
  personId: number;
  visitType: string;
  plannedDateTime: string;
  actualDateTime: string;
  createdByName: string;
  createdByEmail: string;
  reasonNotPlanned?: string;
  reasonVisitNotMade?: string;
  seenAloneFlag: boolean;
  completedFlag: boolean;
}

export type CaseFormData =
  | CaseFormDataBase
  | AllocationCaseFormData
  | DeallocationCaseFormData
  | WarningNoteCaseFormData;

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
  nextCursor?: number;
}

export interface LegacyResident {
  mosaicId: number;
  firstName: string;
  lastName: string;
  uprn?: string;
  dateOfBirth: string;
  ageContext: AgeContext;
  gender: string;
  nationality?: string;
  nhsNumber: string;
  restricted?: 'Y' | 'N';
  address?: {
    address: string | null;
    postcode: string | null;
    uprn?: string;
  };
  phoneNumber?: Array<{
    phoneNumber: string;
    phoneType: string;
  }>;
}

export interface ResidentsAPI {
  residents: LegacyResident[] | [];
  nextCursor?: string;
}

/**
 * This should replace LegacyResident
 * When /residents is going to be aligned with /residents/:id
 */
export interface Resident {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  contextFlag: AgeContext;
  createdBy: string;
  otherNames: Array<{
    firstName: string;
    lastName: string;
  }>;
  phoneNumbers: Array<{
    number: string;
    type: string;
  }>;
  title?: string;
  dateOfBirth?: string;
  ethnicity?: string;
  firstLanguage?: string;
  religion?: string;
  sexualOrientation?: string;
  nhsNumber?: number;
  emailAddress?: string;
  preferredMethodOfContact?: string;
  restricted?: 'Y' | 'N';
  dateOfDeath?: string;
  address?: {
    address: string;
    postcode: string;
    uprn?: string;
  };
}

export interface User {
  name: string;
  email: string;
  permissionFlag: AgeContext;
  hasDevPermissions: boolean;
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
  teams: Team[];
}

export interface RelationshipPerson {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Relationship {
  parents: Array<RelationshipPerson>;
  siblings: Array<RelationshipPerson>;
  children: Array<RelationshipPerson>;
  other: Array<RelationshipPerson>;
}

export interface RelationshipData {
  personId: number;
  personalRelationships: Relationship;
}

interface BaseNote {
  id: number;
  noteType: string;
  createdBy: string;
  startDate: string;
  reviewDate: string;
  endDate?: string;
  endedBy?: string;
  reviewedDate?: string;
  reviewedBy?: string;
  nextReviewDate?: string;
  notes: string;
  managerName: string;
  discussedWithManagerDate: string;
  status: 'closed' | 'open';
  warningNoteReviews: Array<ReviewedNote>;
}

interface DisclosedNote extends BaseNote {
  disclosedWithIndividual: true;
  disclosedDetails: string;
  disclosedDate: string;
  disclosedHow: 'Verbal' | 'Written' | 'Verbal / Written';
}

interface UndisclosedNote extends BaseNote {
  disclosedWithIndividual: false;
  undisclosedDetails: string;
}

interface ReviewedNote {
  id: number;
  warningNoteId: number;
  reviewDate: string;
  disclosedWithIndividual: boolean;
  reviewNotes: string;
  managerName: string;
  discussedWithManagerDate: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt?: string;
  lastModifiedBy: string;
}

export type WarningNote = DisclosedNote | UndisclosedNote;

export interface WarningNotes {
  notes: Array<WarningNote>;
}
