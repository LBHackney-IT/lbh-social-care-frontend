import { AxiosError } from 'axios';

export type ErrorAPI = AxiosError;

export interface Address {
  address: string;
  postcode: string;
  uprn?: string;
}

export interface AddressWrapper {
  address: Address[];
  page_count: number;
}

export type AgeContext = 'A' | 'B' | 'C' | undefined;

export interface Allocation {
  id: number;
  caseStatus: 'Closed' | 'Open';
  allocatedWorkerTeamId?: number;
  allocatedWorkerTeam: string;
  allocatedWorker: string;
  allocationStartDate: string;
  allocationEndDate?: string;
  workerType: string;
  personId: number;
  personName: string;
  personDateOfBirth: string;
  personAddress: string;
  ragRating: string;
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
  workflowId?: string;
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
  isImported: boolean;
  deleted: boolean;
  deletionDetails?: {
    deletedAt: string;
    deletedBy: string;
    deleteReason: string;
    deleteRequestedBy: string;
  };
  pinnedAt?: string;
}

export interface CaseData {
  cases: Case[];
  totalCount: number;
  nextCursor?: number;
  deletedRecordsCount?: number;
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
  totalCount?: string;
}

/**
 * This should replace LegacyResident
 * When /residents is going to be aligned with /residents/:id
 */
export interface PhoneNumber {
  number: string;
  type: string;
}

export interface OtherName {
  firstName: string;
  lastName: string;
}

export interface LegacyAddress {
  addressLines: string;
  postCode: string;
  uprn?: string;
  isDisplayAddress?: string;
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
  isInWorkflowsPilot?: boolean;
  isInSafeguardingReviewing?: boolean;
  isInPlacementManagementUnit?: boolean;
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

export interface WorkerAllocation {
  allocations: Allocation[];
  workers: Worker[];
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

export interface CaseStatusFields {
  option: string;
  value: string;
  startDate: string;
  createdAt: string;
  groupId?: string;
  endDate?: string;
}

export interface CaseStatus {
  id: number;
  type: 'CIN' | 'CP' | 'LAC';
  answers: Array<CaseStatusFields>;
  startDate: string;
  endDate: string;
  notes: string;
}

export enum CaseStatusMapping {
  CIN = 'Child in need',
  CP = 'Child protection',
  LAC = 'Looked after child',
}

export enum LACLegalStatusOptions {
  C1 = 'C1: Interim care order',
  C2 = 'C2: Full care order',
  D1 = 'D1: Freeing order granted',
  E1 = 'E1: Placement order granted',
  V2 = 'V2: Single period of accommodation under section 20 (Children Act 1989)',
  V3 = 'V3: Accommodated under an agreed series of short-term breaks, when individual episodes of care are recorded',
  V4 = 'V4: Accommodated under an agreed series of short-term breaks, when agreements are recorded (NOT individual episodes of care)',
  L1 = 'L1: Under police protection and in local authority accommodation',
  L2 = 'L2: Emergency protection order (EPO)',
  L3 = 'L3: Under child assessment order and in local authority accommodation',
  J1 = 'J1: Remanded to local authority accommodation or to youth detention accommodation',
  J2 = 'J2: Placed in local authority accommodation under the Police and Criminal Evidence Act 1984, including secure accommodation. However, this would not necessarily be accommodation where the child would be detained.',
  J3 = 'J3: Sentenced to Youth Rehabilitation Order (Criminal Justice and Immigration Act 2008 as amended by Legal Aid, Sentencing and Punishment of Offenders Act (LASPOA) 2012 with residence or intensive fostering requirement)',
}

export enum LACPlacementTypeOptions {
  A3 = 'A3: Placed for adoption with parental/guardian consent with current foster carer(s) (under Section 19 of the Adoption and Children Act 2002) or with a freeing order where parental/guardian consent has been given (under Section 18(1)(a) of the Adoption Act 1976)',
  A4 = 'A4: Placed for adoption with parental/guardian consent not with current foster carer(s) (under Section 19 of the Adoption and Children Act 2002) or with a freeing order where parental/guardian consent has been given under Section 18(1)(a) of the Adoption Act 1976',
  A5 = 'A5: Placed for adoption with placement order with current foster carer(s) (under Section 21 of the Adoption and Children Act 2002) or with a freeing order where parental/guardian consent was dispensed with (under Section 18(1)(b) the Adoption Act 1976)',
  A6 = 'A6: Placed for adoption with placement order not with current foster carer(s) (under Section 21 of the Adoption and Children Act 2002) or with a freeing order where parental/guardian consent was dispensed with (under Section 18(1)(b) of the Adoption Act 1976)',
  H5 = 'H5: Semi-independent living accommodation not subject to children’s homes regulations',
  K1 = 'K1: Secure children’s homes',
  K2 = 'K2: Children’s Homes subject to Children’s Homes Regulations P1 Placed with own parent(s) or other person(s) with parental responsibility',
  P2 = 'P2: Independent living for example in a flat, lodgings, bedsit, bed and breakfast (B&B) or with friends, with or without formal support',
  P3 = 'P3: Residential employment',
  R1 = 'R1: Residential care home',
  R2 = 'R2: National Health Service (NHS)/health trust or other establishment providing medical or nursing care',
  R3 = 'R3: Family centre or mother and baby unit',
  R5 = 'R5: Young offender institution (YOI)',
  S1 = 'S1: All residential schools, except where dual-registered as a school and children’s home',
  T0 = 'T0: All types of temporary move (see paragraphs above for further details)',
  T1 = 'T1: Temporary periods in hospital',
  T2 = 'T2: Temporary absences of the child on holiday',
  T3 = 'T3: Temporary accommodation whilst normal foster carer(s) is/are on holiday',
  T4 = 'T4: Temporary accommodation of seven days or less, for any reason, not covered by codes T1 to T3',
  U1 = 'U1: Foster placement with relative(s) or friend(s) – long term fostering',
  U2 = 'U2: Fostering placement with relative(s) or friend(s) who is/are also an approved adopter(s) – fostering for adoption /concurrent planning',
  U3 = 'U3: Fostering placement with relative(s) or friend(s) who is/are not longterm or fostering for adoption /concurrent planning',
  U4 = 'U4: Foster placement with other foster carer(s) – long term fostering',
  U5 = 'U5: Foster placement with other foster carer(s) who is/are also an approved adopter(s) – fostering for adoption /concurrent planning',
  U6 = 'U6: Foster placement with other foster carer(s) – not long term or fostering for adoption /concurrent planning',
  Z1 = 'Z1: Other placements (must be listed on a schedule sent to DfE with annual submission)',
}
export enum LACReasonsForEpisodeEndOptions {
  X1 = 'X1: Episode ceases, and new episode begins on same day, for any reason',
  E11 = 'E11: Adopted - application for an adoption order unopposed',
  E12 = 'E12: Adopted – consent dispensed with by the court',
  E2 = 'E2: Died',
  E3 = 'E3: Care taken over by another local authority in the UK',
  E4A = 'E4A: Returned home to live with parent(s), relative(s), or other person(s) with parental responsibility as part of the care planning process (not under a special guardianship order or residence order or (from 22 April 2014) a child arrangement order).',
  E4B = 'E4B: Returned home to live with parent(s), relative(s), or other person(s) with parental responsibility which was not part of the current care planning process (not under a special guardianship order or residence order or (from 22 April 2014) a child arrangement order).',
  E13 = 'E13: Left care to live with parent(s), relative(s), or other person(s) with no parental responsibility.',
  E41 = 'E41: Residence order (or, from 22 April 2014, a child arrangement order which sets out with whom the child is to live) granted',
  E45 = 'E45: Special guardianship order made to former foster carer(s), who was/are a relative(s) or friend(s)',
  E46 = 'E46: Special guardianship order made to former foster carer(s), other than relative(s) or friend(s)',
  E47 = 'E47: Special guardianship order made to carer(s), other than former foster carer(s), who was/are a relative(s) or friend(s)',
  E48 = 'E48: Special guardianship order made to carer(s), other than former foster carer(s), other than relative(s) or friend(s)',
  E5 = 'E5: Moved into independent living arrangement and no longer looked-after: supportive accommodation providing formalised advice/support arrangements (such as most hostels, young men’s Christian association, foyers, staying close and care leavers projects). Includes both children leaving care before and at age 18',
  E6 = 'E6: Moved into independent living arrangement and no longer looked-after : accommodation providing no formalised advice/support arrangements (such as bedsit, own flat, living with friend(s)). Includes both children leaving care before and at age 18',
  E7 = 'E7: Transferred to residential care funded by adult social care services',
  E9 = 'E9: Sentenced to custody',
  E14 = 'E14: Accommodation on remand ended',
  E15 = 'E15: Age assessment determined child is aged 18 or over and E5, E6 and E7 do not apply, such as an unaccompanied asylum-seeking child (UASC) whose age has been disputed',
  E16 = 'E16: Child moved abroad',
  E17 = 'E17: Aged 18 (or over) and remained with current carers (inc under staying put arrangements)',
  E8 = 'E8: Period of being looked-after ceased for any other reason (where none of the other reasons apply)',
}

export enum ChildProtectionCategoryOptions {
  C1 = 'Neglect',
  C2 = 'Physical abuse',
  C3 = 'Emotional abuse',
  C4 = 'Sexual abuse',
  Multiple = 'Multiple',
}

export interface AddCaseStatusFormData {
  personId: number;
  type: string;
  answers?: CaseStatusFormValue[];
  startDate: string;
  endDate?: string;
  notes?: string;
  createdby: string;
}

export interface CaseStatusFormValue {
  option: string;
  value: string;
}

export interface CaseStatusAnswerDisplay {
  startDate: string;
  endDate?: string;
  status: CaseStatusFields[];
  createdAt?: string;
}

export interface EditCaseStatusFormData {
  personId: number;
  caseStatusID: number;
  answers?: CaseStatusFormValue[];
  startDate?: string;
  endDate?: string;
  notes?: string;
  editedBy: string;
}

export interface UpdateLACCaseStatusFormValue {
  option: string;
  value: string;
}

export interface UpdateLACCaseStatusFormData {
  caseStatusID: number;
  startDate: string;
  answers: UpdateLACCaseStatusFormValue[];
  createdBy: string;
}

export interface Paginated<T> {
  items: T[];
  count: number;
}

export interface TeamData {
  teams: Team[];
}

export enum ReferralStage {
  CONTACT = 'CONTACT',
  INITIAL = 'INITIAL',
  SCREENING = 'SCREENING',
  FINAL = 'FINAL',
}

export interface MashResident {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  ethnicity?: string;
  firstLanguage?: string;
  school?: string;
  address?: string;
  postcode?: string;
}

export interface MashReferral {
  id: number;
  referrer: string;
  requestedSupport: string;
  assignedTo?: Worker;
  referralCreatedAt: string;
  mashResidents: MashResident[];
  referralDocumentURI: string;
  stage: ReferralStage;
  contactDecisionUrgentContactRequired?: boolean;
  contactDecisionCreatedAt?: string;
  initialDecisionReferralCategory?: string;
  initialDecision?: string;
  initialDecisionUrgentContactRequired?: boolean;
  initialDecisionCreatedAt?: string;
  screeningDecision?: string;
  screeningUrgentContactRequired?: boolean;
  screeningCreatedAt?: string;
  finalDecision?: string;
  finalDecisionReferralCategory?: string;
  FinalDecisionUrgentContactRequired?: boolean;
  finalDecisionCreatedAt?: string;
}

// export type Tech = 'Mobile phone' | 'Landline' | 'Internet' | 'Telecare';

export interface GPDetails {
  name: string;
  address: string;
  postcode: string;
  phoneNumber: string;
  email: string;
}

export interface KeyContact {
  name: string;
  email: string;
}

export interface Resident {
  id: number;

  //  names
  title?: string;
  firstName: string;
  lastName: string;
  otherNames: OtherName[];

  // sex & gender
  gender: string;
  pronoun?: string;
  genderAssignedAtBirth?: boolean;
  sexualOrientation?: string;

  // languages
  firstLanguage?: string;
  preferredLanguage?: string;
  fluentInEnglish?: boolean;
  interpreterNeeded?: boolean;

  // key contacts
  keyContacts?: KeyContact[];

  // communication
  communicationDifficulties?: boolean;
  difficultyMakingDecisions?: boolean;
  communicationDifficultiesDetails?: string; // TODO use this!?

  // further biographical info
  techUse?: string[];
  dateOfBirth?: string;
  dateOfDeath?: string;
  ethnicity?: string;
  religion?: string;
  employment?: string;
  maritalStatus?: string;
  immigrationStatus?: string;
  careProvider?: string;

  // housing
  livingSituation?: string;
  tenureType?: string;
  accomodationType?: string;
  accessToHome?: string;
  housingOfficer?: string;
  housingStaffInContact?: boolean;
  cautionaryAlert?: boolean;
  possessionEvictionOrder?: string;
  rentRecord?: string;
  housingBenefit?: string;
  councilTenureType?: string;
  tenancyHouseholdStructure?: string;

  // medical & disability
  nhsNumber?: number;
  gpDetails?: GPDetails;
  disabilities?: string[];
  mentalHealthSectionStatus?: string;
  deafRegister?: string;
  blindRegister?: string;
  blueBadge?: boolean;

  // contact details
  address?: Address;
  phoneNumbers: PhoneNumber[];
  // emails: string[];
  preferredMethodOfContact?: string;
  emailAddress?: string;

  // permissions and metadata
  primarySupportReason?: string;
  allocatedTeam?: string;
  openCase?: boolean;
  contextFlag: AgeContext;
  restricted?: 'Y' | 'N';
  createdBy: string;
  lastUpdated?: {
    [key: string]: string;
  };

  /** @deprecated legacy stuff — avoid using these */
  ageContext?: AgeContext;
  addresses?: LegacyAddress[];
}
