import { Form, Step } from '../data/flexibleForms/forms.types';

export interface Theme {
  name: string;
  steps: Step[];
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
