import { formAsObjects } from '.';
import { Form } from './forms.types';

export const mapFormIdToForm: Record<string, Form> = {
  'adult-case-note': formAsObjects.adultCaseNote,
  'child-case-note': formAsObjects.childCaseNote,
  foo: formAsObjects.foo,
  'review-3c': formAsObjects.review3c,
  'FACE overview assessment': formAsObjects.faceOverview,
  'safeguarding-adult-concern-form': formAsObjects.sgAdultConcern,
  'Safeguarding adult manager decision on concern':
    formAsObjects.sgAdultManagerDecisionConcern,
};
