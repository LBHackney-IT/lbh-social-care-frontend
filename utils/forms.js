import CHILD_FORMS from 'data/googleForms/childForms';
import ADULT_FORMS from 'data/googleForms/adultForms';

import { getPermissionFlag } from 'utils/user';

const sortForms = (formA, formB) =>
  formA.text.toLowerCase() < formB.text.toLowerCase() ? -1 : 1;

const normaliseForms = (forms) =>
  forms.map(({ id, text }) => ({ text, value: id ?? text }));

export const getFormsByUserPermission = (user) => {
  const permission = getPermissionFlag(user);
  return permission === 'C'
    ? normaliseForms(CHILD_FORMS).sort(sortForms)
    : permission === 'A'
    ? normaliseForms(ADULT_FORMS).sort(sortForms)
    : [...normaliseForms(ADULT_FORMS), ...normaliseForms(CHILD_FORMS)].sort(
        sortForms
      );
};
