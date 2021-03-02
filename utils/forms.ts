import CHILD_FORMS from 'data/googleForms/childForms';
import ADULT_FORMS from 'data/googleForms/adultForms';

import { getPermissionFlag, UserPermissions } from 'utils/user';

type Form = typeof ADULT_FORMS[number];

interface IForm extends Form {
  id?: string;
}

interface NormalisedForm {
  text: string;
  value: string;
}

const sortForms = (formA: NormalisedForm, formB: NormalisedForm) =>
  formA.text.toLowerCase() < formB.text.toLowerCase() ? -1 : 1;

const normaliseForms = (forms: IForm[]) =>
  forms.map(({ id, text }) => ({ text, value: id ?? text }));

export const getFormsByUserPermission = (
  user: UserPermissions
): Array<NormalisedForm> => {
  const permission = getPermissionFlag(user);
  return permission === 'C'
    ? normaliseForms(CHILD_FORMS).sort(sortForms)
    : permission === 'A'
    ? normaliseForms(ADULT_FORMS).sort(sortForms)
    : [...normaliseForms(ADULT_FORMS), ...normaliseForms(CHILD_FORMS)].sort(
        sortForms
      );
};
