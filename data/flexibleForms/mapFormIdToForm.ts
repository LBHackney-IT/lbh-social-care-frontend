import { formAsObjects } from '.';
import { Form } from './forms.types';

export const mapFormIdToForm: Record<string, Form> = {
  'adult-case-note': formAsObjects.adultCaseNote,
  'child-case-note': formAsObjects.childCaseNote,
  foo: formAsObjects.foo,
};
