import ADULT_FORM_NAMES from 'data/formFilterNames/adultFormNames';
import CHILD_FORM_NAMES from 'data/formFilterNames/childFormNames';

import { getPermissionFlag, UserPermissions } from 'utils/user';

const sortForms = (formA: string, formB: string) =>
  formA.toLocaleLowerCase() < formB.toLowerCase() ? -1 : 1;

const adminArray: Array<string> = [
  ...ADULT_FORM_NAMES,
  ...CHILD_FORM_NAMES,
].sort(sortForms);

export const getFormsByUserPermission = (
  user: UserPermissions
): Array<string> => {
  const permission = getPermissionFlag(user);
  return permission === 'C'
    ? CHILD_FORM_NAMES.sort(sortForms)
    : permission === 'A'
    ? ADULT_FORM_NAMES.sort(sortForms)
    : adminArray.filter((u, i) => i === adminArray.indexOf(u));
};
