import { acs } from 'data/formFilterNames/adultFormNames';
import { cfs } from 'data/formFilterNames/childFormNames';

import { getPermissionFlag, UserPermissions } from 'utils/user';

const sortForms = (formA: string, formB: string) =>
  formA.toLocaleLowerCase() < formB.toLowerCase() ? -1 : 1;

const adminArray: Array<string> = [...acs, ...cfs].sort(sortForms);

export const getFormsByUserPermission = (
  user: UserPermissions
): Array<string> => {
  const permission = getPermissionFlag(user);
  return permission === 'C'
    ? cfs.sort(sortForms)
    : permission === 'A'
    ? acs.sort(sortForms)
    : adminArray.filter((u, i) => i === adminArray.indexOf(u));
};
