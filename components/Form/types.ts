/* eslint-disable @typescript-eslint/no-explicit-any */

import { InputHTMLAttributes } from 'react';
import { RegisterOptions, ValidateResult } from 'react-hook-form';
import TextInput from './TextInput/TextInput';

interface EnhancedRules extends Omit<RegisterOptions, 'validate'> {
  validate?: (
    data: any,
    formData: Record<string, any>
  ) => ValidateResult | Promise<ValidateResult>;
}

type LabelSize = 's' | 'm' | 'l' | 'xl';
type Width = 30 | 20 | 10 | 5 | 4 | 3 | 2;
type GovGrid =
  | 'full'
  | 'half'
  | 'one-half'
  | 'one-third'
  | 'two-thirds'
  | 'one-quarter'
  | 'three-quarters';

export type Option = string | { text: string; value: string };

type FuncOption = (arg0: Record<string, string>) => Option[] | null;

export type Options = FuncOption | Option[];

export interface GenericField {
  name: string;
  label?: string;
  rules?: RegisterOptions;
  register?: (arg0: RegisterOptions) => any;
  error?: { message?: string };
  required?: boolean | string;
  hint?: string;
  labelSize?: LabelSize;
  conditionalRender?: (arg0: Record<string, any>) => boolean;
  isMulti?: boolean;
  isMultiInit?: boolean;
  isMultiTrigger?: string;
}

export interface Checkbox extends GenericField {
  options?: Option[];
}

interface StepCheckbox extends Omit<Checkbox, 'options'> {
  component: 'Checkbox';
  options?: Options;
}

type TextInputType = GenericField & InputHTMLAttributes<HTMLInputElement>;

export interface TextInput extends TextInputType {
  inputClassName?: string;
  width?: Width;
}

interface StepTextInput extends TextInput {
  component: 'TextInput';
}

export type TextInputNoType = Omit<TextInput, 'type'>;

interface StepTextInputNoType extends TextInputNoType {
  component: 'NumberInput' | 'DatePicker' | 'PhoneInput' | 'EmailInput';
}

type TextAreaType = GenericField & InputHTMLAttributes<HTMLTextAreaElement>;

export interface TextArea extends TextAreaType {
  width?: Width;
  rows?: number;
}

interface StepTextArea extends Omit<TextArea, 'rules'> {
  component: 'TextArea';
  rules?: EnhancedRules;
}

type SelectType = GenericField &
  Omit<InputHTMLAttributes<HTMLSelectElement>, 'onChange'>;

export interface Select extends SelectType {
  options: Option[];
  placeHolder?: string;
  ignoreValue?: boolean;
  isUnselectable?: boolean;
  width?: Width;
  govGrid?: GovGrid;
  onChange?: (arg0: string) => string | void;
}

interface StepSelect extends Omit<Select, 'options' | 'rules'> {
  component: 'Select';
  options: Options;
  rules?: EnhancedRules;
}

type RadiosType = GenericField & InputHTMLAttributes<HTMLInputElement>;

export interface Radios extends RadiosType {
  options?: Option[];
  isRadiosInline?: boolean;
  children?: React.ReactNode;
}

interface StepRadios extends Omit<Radios, 'options' | 'rules'> {
  component: 'Radios';
  options?: Options;
  rules?: EnhancedRules;
}

export interface ObjectInput extends GenericField {
  isMulti?: boolean;
  isInline?: boolean;
  summaryInline?: boolean;
  components: Array<formBasicComponentStep>;
}

interface StepObjectInput extends Omit<ObjectInput, 'rules'> {
  component: 'ObjectInput';
  rules?: EnhancedRules;
}

export interface AddressLookup extends GenericField {
  supportManualEntry?: boolean;
}

interface StepAddressLookup extends Omit<AddressLookup, 'rules'> {
  component: 'AddressLookup';
  rules?: EnhancedRules;
}

export interface DateInput extends GenericField {
  format?: 'US' | 'EU';
}

interface StepDateInput extends Omit<DateInput, 'rules'> {
  component: 'DateInput';
  rules?: EnhancedRules;
}

type formBasicComponentStep =
  | StepTextInput
  | StepTextInputNoType
  | StepTextArea
  | StepCheckbox
  | StepSelect
  | StepRadios
  | StepAddressLookup
  | StepDateInput;

export type FormComponentStep =
  | formBasicComponentStep
  | StepObjectInput
  | JSX.Element;

export interface FormStep {
  id: string;
  title: string;
  components: Array<FormComponentStep>;
  isMulti?: boolean;
  conditionalRender?: (arg0: Record<string, unknown>) => boolean;
}

export interface FormConfig {
  title: string;
  path: string;
  successMessage?: string;
  steps: Array<FormStep>;
}
