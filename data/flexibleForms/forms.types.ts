import { Resident, User, Worker } from 'types';

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
    | 'radios'
    | 'checkboxes'
    | 'select'
    | 'repeater'
    | 'repeaterGroup'
    | 'timetable'
    | 'tags'
    | 'combobox'
    | 'file';
  /** Required value is always ignored on fields with a condition */
  required?: boolean;
  hint?: string;
  error?: string;
  choices?: Choice[];
  /** Checkbox, file and repeater fields don't support prefilling */
  prefill?: keyof Resident;
  className?: string;
  /** For file fields only */
  // multiple?: boolean
  condition?: Condition | Condition[];
  subfields?: Field[];
  /** Singular item name for more descriptive buttons and legends  */
  itemName?: string;
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
  groupRecordable?: boolean;
  isViewableByChildrens: boolean;
  isViewableByAdults: boolean;
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

export interface Submission {
  submissionId: string;
  formId: string;
  createdBy: User;
  createdAt: string;
  residents: Resident[];
  workers: Worker[];
  editHistory: {
    worker: Worker;
    editTime: string;
  }[];
  submissionState: 'In progress' | 'Approved' | 'Discarded' | 'Submitted';
  formAnswers: FlexibleAnswers;
  tags?: string[];
}
