import { Form, Step, Field } from '../data/flexibleForms/forms.types';
import { Resident } from 'types';

export interface Theme {
  name: string;
  steps: Step[];
}

type InitialValue = null | string | string[] | InitialValues[];

export interface InitialValues {
  [key: string]: InitialValue;
}

/** Take a form's steps and organise them by theme for displaying in a task list */
export const groupByTheme = (form: Form): Theme[] =>
  form.steps.reduce((groups: Theme[], step) => {
    const name = step.theme;
    if (name && !groups.find((group) => group.name === name)) {
      groups.push({
        name: name,
        steps: [],
      });
    }
    const group = groups.find((group) => group.name === name);
    group?.steps.push(step);
    return groups;
  }, []);

/** Shorten a long string to a given number of words for displaying in previews */
export const truncate = (str: string, noWords: number): string => {
  if (str.split(' ').length > noWords) {
    return str.split(' ').splice(0, noWords).join(' ') + '...';
  } else {
    return str;
  }
};

const noPrefill = new Set(['file']);
const singlePrefills = new Set(['select']);
const iterablePrefills = new Set(['checkboxes', 'repeated']);

/** Generate flexible initial values for a flexible schema */
export const generateInitialValues = (
  fields: Field[],
  person?: Resident
): InitialValues => {
  const initialValues: InitialValues = {};

  fields.map((field) => {
    if (field.type === 'repeaterGroup') {
      initialValues[field.id] = [
        generateInitialValues(field.subfields || [], person),
      ];
    } else if (iterablePrefills.has(field.type)) {
      initialValues[field.id] = [];
    } else if (noPrefill.has(field.type)) {
      initialValues[field.id] = null;
    } else if (singlePrefills.has(field.type)) {
      initialValues[field.id] =
        (person && field.prefill && [field.prefill]) ||
        (field.choices && field.choices[0].value) ||
        [];
    } else {
      initialValues[field.id] =
        (person && field.prefill && [field.prefill]) || '';
    }
  });
  return initialValues;
};

/** Push an element into an array, without duplicates */
export const pushUnique = <T>(array: T[], newElement: T): T[] =>
  Array.from(new Set(array).add(newElement));
