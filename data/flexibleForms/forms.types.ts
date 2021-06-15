import { Resident } from 'types';

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
  condition?: {
    id: string;
    value: string | boolean;
  };
  subfields?: Field[];
  /** Singular item name for more descriptive buttons and legends  */
  itemName?: string;
}

export interface Step {
  id: string;
  name: string;
  theme: string;
  fields: Field[];
}

export interface Form {
  id: string;
  name: string;
  steps: Step[];
}

export interface RepeaterGroupAnswer {
  [key: string]: string | string[];
}

export interface StepAnswers {
  // questions and answers
  [key: string]: string | (string | RepeaterGroupAnswer)[];
}

export interface FlexibleAnswers {
  // sections
  [key: string]: StepAnswers;
}

export interface Submission {
  id: string;
  socialCareId: number;
  formId: string;
  answers: FlexibleAnswers;
  completedSteps: string[];
  createdBy: string;
  editedBy: string[];
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  discardedAt: string | null;
}
