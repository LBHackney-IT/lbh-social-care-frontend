import type { User } from 'types';

export type UserPermissions = Pick<
  User,
  | 'hasDevPermissions'
  | 'hasAdultPermissions'
  | 'hasChildrenPermissions'
  | 'hasAdminPermissions'
>;

export const isOnlyAdult = ({
  hasDevPermissions,
  hasAdultPermissions,
  hasChildrenPermissions,
  hasAdminPermissions,
}: UserPermissions): boolean =>
  !hasDevPermissions &&
  hasAdultPermissions &&
  !hasChildrenPermissions &&
  !hasAdminPermissions;

export const isOnlyChildren = ({
  hasDevPermissions,
  hasAdultPermissions,
  hasChildrenPermissions,
  hasAdminPermissions,
}: UserPermissions): boolean =>
  !hasDevPermissions &&
  !hasAdultPermissions &&
  hasChildrenPermissions &&
  !hasAdminPermissions;

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
): 'Dev' | 'Admin' | 'Adult' | 'Children' =>
  isOnlyAdult(user)
    ? 'Adult'
    : isOnlyChildren(user)
    ? 'Children'
    : user.hasDevPermissions
    ? 'Dev'
    : 'Admin';
