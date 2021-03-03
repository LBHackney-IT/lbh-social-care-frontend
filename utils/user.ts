import type { User } from 'types';

export type UserPermissions = Pick<
  User,
  'hasAdminPermissions' | 'hasAdultPermissions' | 'hasChildrenPermissions'
>;

export const isOnlyAdult = ({
  hasAdminPermissions,
  hasAdultPermissions,
  hasChildrenPermissions,
}: UserPermissions): boolean =>
  !hasAdminPermissions && hasAdultPermissions && !hasChildrenPermissions;

export const isOnlyChildren = ({
  hasAdminPermissions,
  hasAdultPermissions,
  hasChildrenPermissions,
}: UserPermissions): boolean =>
  !hasAdminPermissions && !hasAdultPermissions && hasChildrenPermissions;

export const getPermissionFlag = (
  user: UserPermissions
): 'A' | 'C' | undefined => {
  if (isOnlyAdult(user)) return 'A';
  if (isOnlyChildren(user)) return 'C';
};

/**
 * Returns the name type of the user.
 *
 * Note: for permission checks use `user.hasAdminPermissions` instead
 * @param {User} user the `user` returned by the `UserContext`
 */
export const getUserType = (
  user: UserPermissions
): 'Admin' | 'Adult' | 'Children' | undefined =>
  isOnlyAdult(user) ? 'Adult' : isOnlyChildren(user) ? 'Children' : 'Admin';
