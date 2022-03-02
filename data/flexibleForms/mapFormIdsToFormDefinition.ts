import { formAsObjects } from './index';
import { Form } from './forms.types';

type FormDefinition = {
  form: Form;
  displayName: string;
  id: string;
};

export const mapFormIdToFormDefinition: Record<
  string,
  FormDefinition | undefined
> = {
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
};
