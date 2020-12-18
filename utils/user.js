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
