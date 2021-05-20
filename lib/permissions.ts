import { Resident, User } from '../types';

export const canUserEditPerson = (
  user: User,
  person: Pick<Resident, 'restricted' | 'contextFlag'>
): boolean => {
  const isPersonRestricted = person.restricted === 'Y';

  if (user.hasAdminPermissions || user.hasDevPermissions) {
    if (isPersonRestricted) {
      return user.hasUnrestrictedPermissions || false;
    }

    return true;
  }

  if (user.hasChildrenPermissions && person.contextFlag === 'C') {
    if (isPersonRestricted) {
      return user.hasUnrestrictedPermissions || false;
    }
    return true;
  }

  if (person.contextFlag === 'A') {
    return false;
  }

  return false;
};

export const canManageCases = (
  user: User,
  person: Pick<Resident, 'restricted' | 'contextFlag'>
): boolean => {
  const isPersonRestricted = person.restricted === 'Y';

  if (user.hasAdminPermissions || user.hasDevPermissions) {
    if (isPersonRestricted) {
      return user.hasUnrestrictedPermissions || false;
    }

    return true;
  }

  if (user.hasChildrenPermissions && person.contextFlag === 'C') {
    if (isPersonRestricted) {
      return user.hasUnrestrictedPermissions || false;
    }

    return true;
  }

  if (user.hasAdultPermissions && person.contextFlag === 'A') {
    if (isPersonRestricted) {
      return user.hasUnrestrictedPermissions || false;
    }

    return true;
  }

  return false;
};
