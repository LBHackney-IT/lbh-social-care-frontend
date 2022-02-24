import { Resident, Worker } from 'types';

export interface Choice {
  value: string;
  label: string;
}

export interface Field {
  id: string;
  question: string;
  type:
    | 'text'
    | 'textarea'
    | 'date'
    | 'datetime'
    | 'radios'
    | 'checkboxes'
    | 'select'
    | 'repeater'
    | 'repeaterGroup'
    | 'timetable'
    | 'tags'
    | 'combobox'
    | 'file';
  hint?: string;
  error?: string;
  conditions?: Condition[] | { OR?: Condition[] };
  className?: string;
  /** on conditional fields, required value is only respected when all conditions are met */
  required?: boolean;
  /** give an initial, default value for datetime and string-type fields */
  default?: string | [string, string];
  /** for select, radio, checkboxes, tags and combobox fields */
  choices?: Choice[];
  /** checkbox, file and repeater fields don't support prefilling */
  prefill?: keyof Resident;
  /** for repeater groups only */
  subfields?: Field[];
  /** option to start with repeater group not open by default */
  hiddenRepeater?: boolean;
  /** for πer and repeater groups, a singular item name for more descriptive buttons and legends  */
  itemName?: string;
  /** for textareas only*/
  rows?: number;
  /** for file fields only */
  // multiple?: boolean
  /**for date inputs that are not allowed to be set in the future */
  isfutureDateValid?: boolean;
  /**for date inputs that are not allowed to be set in the past before the specified date */
  startDate?: string;
}

export const isConditionList = (input: unknown): input is Condition[] =>
  Array.isArray(input) &&
  input.every((c) => c?.id !== undefined && c?.value !== undefined);

interface Condition {
  id: string;
  value: string | boolean;
}

export interface Step {
  id: string;
  name: string;
  intro?: string;
  theme: string;
  fields: Field[];
}

export interface Form {
  id: string;
  name: string;
  steps: Step[];
  approvable?: boolean;
  panelApprovable?: boolean;
  groupRecordable?: boolean;
  isViewableByChildrens: boolean;
  isViewableByAdults: boolean;
  tags?: string[];
  /** override the automatically generated /submissions/new... url, for edge case forms */
  canonicalUrl?: (socialCareId: number) => string;
  dateOfEvent?: {
    associatedId: string;
  };
  title?: {
    associatedId: string;
  };
}

export interface RepeaterGroupAnswer {
  [key: string]: string | string[];
}

export interface TimetableAnswer {
  [key: string]: {
    [key: string]: string;
  };
}

export type Answer =
  | string
  | TimetableAnswer
  | (string | RepeaterGroupAnswer)[];

export interface StepAnswers {
  // questions and answers
  [key: string]: Answer;
}

export interface FlexibleAnswers {
  // sections
  [key: string]: StepAnswers;
}

export type InProgressSubmission = Omit<
  Submission,
  | 'formAnswers'
  | 'editHistory'
  | 'workers'
  | 'submittedBy'
  | 'createdBy'
  | 'submittedBy'
  | 'submittedAt'
  | 'residents'
  | 'approvedBy'
  | 'approvedAt'
  | 'panelApprovedBy'
  | 'panelApprovedAt'
  | 'tags'
> & {
  workers: Pick<Worker, 'email'>[];
  createdBy: Pick<Worker, 'email'>;
  residents: Pick<
    Resident,
    'id' | 'ageContext' | 'firstName' | 'lastName' | 'restricted'
  >[];
};

export enum SubmissionState {
  InProgress = 'In progress',
  Approved = 'Approved',
  Discarded = 'Discarded',
  Submitted = 'Submitted',
  PanelApproved = 'Panel Approved',
}

export interface Submission {
  submissionId: string;
  isImported: boolean;
  formId: string;
  createdBy: Worker;
  createdAt: string;
  submittedBy: Worker | null;
  submittedAt: string | null;
  approvedBy: Worker | null;
  approvedAt: string | null;
  panelApprovedBy: Worker | null;
  panelApprovedAt: string | null;
  residents: Resident[];
  workers: Worker[];
  editHistory: Revision[];
  submissionState: SubmissionState;
  formAnswers: FlexibleAnswers;
  tags?: string[];
  lastEdited: string;
  completedSteps: number;
  title?: string;
  deleted: boolean;
  deletionDetails?: {
    deletedAt: string;
    deletedBy: string;
    deleteReason: string;
    deleteRequestedBy: string;
  };
}

export interface Revision {
  worker: Worker;
  editTime: string;
}
