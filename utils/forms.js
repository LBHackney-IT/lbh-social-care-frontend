import CHILD_FORMS from 'data/googleForms/childForms';
import ADULT_FORMS from 'data/googleForms/adultForms';

import { getPermissionFlag } from 'utils/user';

const sortForms = (formA, formB) =>
  formA.text.toLowerCase() < formB.text.toLowerCase() ? -1 : 1;

const normaliseForms = (forms) =>
  forms.map(({ id, text }) => ({ text, value: id ?? text })).sort(sortForms);

const C_FORMS = normaliseForms(CHILD_FORMS);
const A_FORMS = normaliseForms(ADULT_FORMS);

export const getFormsByUserPermission = (user) => {
  const permission = getPermissionFlag(user);
  return permission === 'C'
    ? C_FORMS
    : permission === 'A'
    ? A_FORMS
    : [...A_FORMS, ...C_FORMS].sort(sortForms);
};
