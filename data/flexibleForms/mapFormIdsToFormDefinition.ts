import { formAsObjects } from '.';
import { Form } from './forms.types';

type FormDefinition = {
  form: Form;
  displayName: string;
  id: string;
};

export const mapFormIdToFormDefinition: Record<string, FormDefinition> = {
  'adult-case-note': {
    form: formAsObjects.adultCaseNote,
    displayName: 'Case note',
    id: 'adult-case-note',
  },
  'child-case-note': {
    form: formAsObjects.childCaseNote,
    displayName: 'Case note',
    id: 'child-case-note',
  },
  foo: {
    form: formAsObjects.foo,
    displayName: 'Sandbox form',
    id: 'foo',
  },
  'review-3c': {
    form: formAsObjects.review3c,
    displayName: 'Review of Care and Support Plan (3C)',
    id: 'review-3c',
  },
  'face-overview-assessment': {
    form: formAsObjects.faceOverview,
    displayName: 'FACE overview assessment',
    id: 'face-overview-assessment',
  },
  'safeguarding-adult-concern-form': {
    form: formAsObjects.sgAdultConcern,
    displayName: 'Safeguarding Adult Concern Form',
    id: 'safeguarding-adult-concern-form',
  },
  'safeguarding-adult-manager-decision-on-concern': {
    form: formAsObjects.sgAdultManagerDecisionConcern,
    displayName: 'Safeguarding adult manager decision on concern',
    id: 'safeguarding-adult-manager-decision-on-concern',
  },
};
