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
  formType?: string;
  title?: string;
}

export interface CaseData {
  cases: Case[];
  nextCursor?: number;
}

export interface LegacyResident {
  mosaicId: string;
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
  ageContext?: AgeContext;
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
  addresses?: {
    addressLines: string;
    postCode: string;
    uprn?: string;
    isDisplayAddress?: string;
  }[];
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
  isAuditable: boolean;
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

export interface ExistingRelationship {
  id: number;
  personId: number;
  firstName: string;
  lastName: string;
  gender?: string;
  isMainCarer?: string;
  details?: string;
}

export interface Relationship {
  type: RelationshipType;
  relationships: ExistingRelationship[];
}

export interface RelationshipData {
  personId: number;
  personalRelationships: Relationship[];
}

export type RelationshipType =
  | 'parent'
  | 'child'
  | 'other'
  | 'greatGrandchild'
  | 'greatGrandparent'
  | 'grandchild'
  | 'grandparent'
  | 'stepParent'
  | 'auntUncle'
  | 'stepChild'
  | 'unbornChild'
  | 'partner'
  | 'exPartner'
  | 'sibling'
  | 'halfSibling'
  | 'stepSibling'
  | 'unbornSibling'
  | 'spouse'
  | 'cousin'
  | 'nieceNephew'
  | 'fosterCarer'
  | 'friend'
  | 'exSpouse'
  | 'parentOfUnbornChild'
  | 'siblingOfUnbornChild'
  | 'fosterCarerSupportCarer'
  | 'privateFosterCarer'
  | 'privateFosterChild'
  | 'fosterChild'
  | 'supportCarerFosterCarer'
  | 'neighbour'
  | 'inContactWith'
  | 'acquaintance';

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

export interface FormValue {
  name: string;
  description: string;
  options: Array<FormOption>;
}

export interface FormFields {
  fields: Array<FormValue>;
}

export interface FormOption {
  name: string;
  description: string;
}

export interface CaseStatusFields {
  name: string;
  description: string;
  selectedOption: FormOption;
}

export interface CaseStatus {
  id: number;
  type: 'CIN' | 'CP' | 'LAC';
  fields: Array<CaseStatusFields>;
  startDate: string;
  endDate: string;
  notes: string;
}

export enum CaseStatusMapping {
  CIN = 'Child in need',
  CP = 'Child protection',
  LAC = 'Looked after child',
}

export enum LookedAfterChildOptions {
  V4 = 'V4: Accommodated under an agreed series of short-term breaks, when agreements are recorded (ie NOT individual episods of care)',
  V3 = 'V3: Accomodated under an agreed series of short-term breaks, when individual episodes of care are recorded',
  J2 = 'J2: Detained in LA accomodation and PACE',
  L2 = 'L2: Emergency protection order',
  D1 = 'D1: Freeing order granted',
  C2 = 'C2: Full care order',
  C1 = 'C1: Interim care order',
  J1 = 'J1: On remand, or committed for tiral or sentence, and accomodated by LA',
  E1 = 'E1: Placement order granted',
  J3 = 'J3: Sentencted to CYPA 1969 supervision order with residence requirement',
  V2 = 'V2: Single period of accomodation under section 20',
  L3 = 'L3: Under child assessment order and in local authority accomodation',
  L1 = 'L1: Under police protection and in local authority accomodation',
  W1 = 'W1: Wardship granted in High Court and child in LA accomodation',

  S1 = 'S1: All residential schools, except where dual-registered as a school',
  T0 = 'T0: All types of temprary move',
  R3 = 'R3: Family centre or mother and baby unit',
  U2 = 'U2: Foster placement with relative or friend who is also an approved adopter - FFA',
  U1 = 'U1: Foster placement with relative or friend - long term fostering',
  U3 = 'U3: Foster placement with relative or friend - not long term of FFA',
  K2 = 'K2: Homes and hostels',
  P2 = 'P2: Independent living, e.g. in flat or lodgings, bedsit, B&B or with friends, with or without formal support staff',
  R2 = 'R2: NHS/health Trust or other enstablishment providing medical or nursing care',
  Z1 = 'Z1: Other placements (must be listed on a schedule sent to DH with annual submission)',

  X1 = 'X1: Episode ceases, and new episode begins on same day, for any reason',
  E11 = 'E11: Adopted - application for an adoption order unopposed ',
  E12 = 'E12: Adopted – consent dispensed with by the court',
  E2 = 'E2: Died',
  E3 = 'E3: Care taken over by another local authority in the UK',
  E4A = 'E4A: Returned home to live with parent(s), relative(s), or other person(s) with parental responsibility as part of the care planning process (not under a special guardianship order or residence order or (from 22 April 2014) a child arrangement order).',
  E4B = 'E4B: Returned home to live with parent(s), relative(s), or other person(s) with parental responsibility which was not part of the current care planning process (not under a special guardianship order or residence order or (from 22 April 2014) a child arrangement order).',
  E13 = 'E13: Left care to live with parent(s), relative(s), or other person(s) with no parental responsibility.',
  E41 = 'E41: Residence order (or, from 22 April 2014, a child arrangement order which sets out with whom the child is to live) granted',
  E45 = 'E45: Special guardianship order made to former foster carer(s), who was/are a relative(s) or friend(s)',
  E46 = 'E46: Special guardianship order made to former foster carer(s), other than relative(s) or friend(s) ',
  E47 = 'E47: Special guardianship order made to carer(s), other than former foster carer(s), who was/are a relative(s) or friend(s)',
  E48 = 'E48: Special guardianship order made to carer(s), other than former foster carer(s), other than relative(s) or friend(s) ',
  E5 = 'E5: Moved into independent living arrangement and no longer looked-after: supportive accommodation providing formalised advice/support arrangements (such as most hostels, young men’s Christian association, foyers, staying close and care leavers projects). Includes both children leaving care before and at age 18 ',
  E6 = 'E6: Moved into independent living arrangement and no longer looked-after : accommodation providing no formalised advice/support arrangements (such as bedsit, own flat, living with friend(s)). Includes both children leaving care before and at age 18 ',
  E7 = 'E7: Transferred to residential care funded by adult social care services ',
  E9 = 'E9: Sentenced to custody ',
  E15 = 'E15: Age assessment determined child is aged 18 or over and E5, E6 and E7 do not apply, such as an unaccompanied asylum-seeking child (UASC) whose age has been disputed ',
  E16 = 'E16: Child moved abroad ',
  E17 = 'E17: Aged 18 (or over) and remained with current carers (inc under staying put arrangements) ',
  E8 = 'E8: Period of being looked-after ceased for any other reason (where none of the other reasons apply)',
}

export enum ChildProtectionCategoryOptions {
  C1 = 'Neglect',
  C2 = 'Physical abuse',
  C3 = 'Emotional abuse',
  C4 = 'Sexual abuse',
}

export interface AddCaseStatusFormData {
  personId: number;
  type: string;
  fields?: [{ name: string; selected: string }];
  startDate: string;
  endDate?: string;
  notes: string;
  createdby: string;
}

export interface EditCaseStatusFormData {
  personId: number;
  values?: [{ name: string; selected: string }];
  startDate?: string;
  endDate?: string;
  notes?: string;
  editedBy: string;
}

export interface Paginated<T> {
  items: T[];
  count: number;
}
