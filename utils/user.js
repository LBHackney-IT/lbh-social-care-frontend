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

export const getUserType = (user) =>
  user &&
  (isOnlyAdult(user) ? 'Adult' : isOnlyChildren(user) ? 'Children' : 'Admin');
