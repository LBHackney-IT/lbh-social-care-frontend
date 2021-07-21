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
  condition?: Condition | Condition[];
  className?: string;
  /** on conditional fields, required value is only respected when all conditions are met */
  required?: boolean;
  /** give an initial, default value for datetime and string-type fields */
  default?: string | string[];
  /** for select, radio, checkboxes, tags and combobox fields */
  choices?: Choice[];
  /** checkbox, file and repeater fields don't support prefilling */
  prefill?: keyof Resident;
  /** for repeater groups only */
  subfields?: Field[];
  /** option to start with repeater group not open by default */
  hiddenRepeater?: boolean;
  /** for repeater and repeater groups, a singular item name for more descriptive buttons and legends  */
  itemName?: string;
  /** for file fields only */
  // multiple?: boolean
}

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
  groupRecordable?: boolean;
  isViewableByChildrens: boolean;
  isViewableByAdults: boolean;
  tags?: string[];
  /** override the automatically generated /submissions/new... url, for edge case forms */
  canonicalUrl?: (socialCareId: number) => string;
}

export interface RepeaterGroupAnswer {
  [key: string]: string | [string, string];
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

export interface Submission {
  submissionId: string;
  formId: string;
  form?: Form;
  createdBy: Worker;
  createdAt: string;
  submittedBy: Worker | null;
  submittedAt: string | null;
  approvedBy: Worker | null;
  approvedAt: string | null;
  residents: Resident[];
  workers: Worker[];
  editHistory: Revision[];
  submissionState: 'In progress' | 'Approved' | 'Discarded' | 'Submitted';
  formAnswers: FlexibleAnswers;
  tags?: string[];
}

export interface Revision {
  worker: Worker;
  editTime: string;
}
