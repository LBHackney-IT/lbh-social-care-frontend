export interface Choice {
  value: string;
  label: string;
}

export interface Field {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'radios' | 'checkboxes' | 'select' | 'repeater';
  /** Required value is always ignored on fields with a condition */
  required: boolean;
  hint?: string;
  error?: string;
  choices?: Choice[];
  /** Checkbox and repeater fields don't support prefilling */
  prefill?: string;
  className?: string;
  condition?: {
    id: string;
    value: string | boolean;
  };
}

export interface Step {
  id: string;
  name: string;
  theme?: string;
  fields: Field[];
}

export interface Form {
  id: string;
  name: string;
  steps: Step[];
}
