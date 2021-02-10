export const isOnlyAdult = ({
  hasAdminPermissions,
  hasAdultPermissions,
  hasChildrenPermissions,
}) => !hasAdminPermissions && hasAdultPermissions && !hasChildrenPermissions;

export const isOnlyChildren = ({
  hasAdminPermissions,
  hasAdultPermissions,
  hasChildrenPermissions,
}) => !hasAdminPermissions && !hasAdultPermissions && hasChildrenPermissions;

export const getPermissionFlag = (user) => {
  if (isOnlyAdult(user)) return 'A';
  if (isOnlyChildren(user)) return 'C';
};

/**
 * Returns the name type of the user.
 *
 * Note: for permission checks use `user.hasAdminPermissions` instead
 * @param {object} user the `user` returned by the `UserContext`
 */
export const getUserType = (user) =>
  user &&
  (isOnlyAdult(user) ? 'Adult' : isOnlyChildren(user) ? 'Children' : 'Admin');
