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

export const canViewRelationships = (
  user: User,
  person: Pick<Resident, 'restricted' | 'contextFlag'>
): boolean => {
  if (user.hasDevPermissions) {
    return true;
  }
  if (user.hasAdultPermissions && person.contextFlag === 'A') {
    return true;
  }
  if (user.hasChildrenPermissions && person.contextFlag === 'C') {
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

export const canUserManageWorkers = (user: User): boolean => {
  if (user.hasAdminPermissions || user.hasDevPermissions) {
    return true;
  }

  return false;
};

export const isAdminOrDev = (user: User): boolean => {
  if (user.hasAdminPermissions || user.hasDevPermissions) {
    return true;
  }

  return false;
};

export const canAddWorkflow = (user: User): boolean => {
  if (user.hasAdminPermissions || user.hasDevPermissions) return true;

  if (user.isInWorkflowsPilot) return true;

  return false;
};
