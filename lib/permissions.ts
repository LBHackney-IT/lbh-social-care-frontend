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

  if (user.hasAdultPermissions && person.contextFlag === 'A') {
    if (isPersonRestricted) {
      return user.hasUnrestrictedPermissions || false;
    }

    return true;
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

export const canUserAllocateWorkerToPerson = (
  user: User,
  person: Resident
): boolean => {
  if (user.hasAdminPermissions || user.hasDevPermissions) {
    return true;
  }

  if (user.hasChildrenPermissions && person.contextFlag === 'C') {
    // Children's doesn't require `hasAllocationsPermissions`, as anyone can allocate in CFS
    return true;
  }

  if (
    user.hasAdultPermissions &&
    person.contextFlag === 'A' &&
    (user.hasAllocationsPermissions || false)
  ) {
    return true;
  }

  return false;
};
