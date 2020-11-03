export const getPermissionFilter = ({
  hasAdminPermissions,
  hasAdultPermissions,
  hasChildrenPermissions,
}) => {
  if (!hasAdminPermissions && hasAdultPermissions && !hasChildrenPermissions)
    return 'a';
  if (!hasAdminPermissions && !hasAdultPermissions && hasChildrenPermissions)
    return 'c';
};
