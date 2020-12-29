export const getPermissionFlag = ({
  hasAdminPermissions,
  hasAdultPermissions,
  hasChildrenPermissions,
}) => {
  if (!hasAdminPermissions && hasAdultPermissions && !hasChildrenPermissions)
    return 'A';
  if (!hasAdminPermissions && !hasAdultPermissions && hasChildrenPermissions)
    return 'C';
};

export const getUserType = (user) => {
  const flag = getPermissionFlag(user);
  return flag === 'A' ? 'Adult' : flag === 'C' ? 'Children' : 'Admin';
};
