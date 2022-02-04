import cookie from 'cookie';
import jsonwebtoken from 'jsonwebtoken';

import type { NextPageContext } from 'next';
import type { User } from 'types';

import { getPermissionFlag } from 'utils/user';

export const AUTH_WHITELIST = ['/login', '/access-denied'];

const GSSO_TOKEN_NAME = process.env.GSSO_TOKEN_NAME;

export const SESSION_EXPIRY = 14400;

export const deleteSession = (
  res: NonNullable<NextPageContext['res']>
): void => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(GSSO_TOKEN_NAME, '', {
      maxAge: -1,
      domain: '.hackney.gov.uk',
    })
  );
  res.writeHead(302, {
    Location: '/login',
  });
  res.end();
};

export const shouldRedirect = (
  pathname: string,
  user?: Partial<User>
): string | undefined => {
  const isPathWhitelisted = AUTH_WHITELIST.includes(pathname);
  if (!isPathWhitelisted) {
    if (!user) {
      return '/login';
    }
    if (!user?.isAuthorised) {
      return '/access-denied';
    }
  }
  if (isPathWhitelisted && user?.isAuthorised) {
    return '/';
  }
};

interface ParsedCookie {
  name: string;
  email: string;
  groups: string[];
}

export const isAuthorised = (
  req: NonNullable<NextPageContext['req']>
): User | undefined => {
  const HACKNEY_JWT_SECRET = process.env.HACKNEY_JWT_SECRET;
  const AUTHORISED_DEV_GROUP = process.env.AUTHORISED_DEV_GROUP;
  const AUTHORISED_ADMIN_GROUP = process.env.AUTHORISED_ADMIN_GROUP;
  const AUTHORISED_ADULT_GROUP = process.env.AUTHORISED_ADULT_GROUP;
  const AUTHORISED_CHILD_GROUP = process.env.AUTHORISED_CHILD_GROUP;
  const AUTHORISED_ALLOCATORS_GROUP = process.env.AUTHORISED_ALLOCATORS_GROUP;
  const AUTHORISED_UNRESTRICTED_GROUP =
    process.env.AUTHORISED_UNRESTRICTED_GROUP;
  const AUTHORISED_AUDITABLE_GROUP = process.env.AUTHORISED_AUDITABLE_GROUP;
  const AUTHORISED_WORKFLOWS_PILOT_GROUP =
    process.env.AUTHORISED_WORKFLOWS_PILOT_GROUP;
  const AUTHORISED_SAFEGUARDING_REVIEWING_GROUP =
    process.env.AUTHORISED_SAFEGUARDING_REVIEWING_GROUP;
  const AUTHORISED_PLACEMENT_MANAGEMENT_UNIT_GROUP =
    process.env.AUTHORISED_PLACEMENT_MANAGEMENT_UNIT_GROUP;

  const cookies = cookie.parse(req.headers.cookie ?? '');
  const parsedToken = cookies[GSSO_TOKEN_NAME]
    ? (jsonwebtoken.verify(cookies[GSSO_TOKEN_NAME], HACKNEY_JWT_SECRET, {
        maxAge: SESSION_EXPIRY,
      }) as ParsedCookie)
    : null;
  if (!parsedToken) {
    return;
  }
  const { groups = [], name, email } = parsedToken;
  const gssUser = {
    hasDevPermissions: groups.includes(AUTHORISED_DEV_GROUP),
    hasAdminPermissions:
      groups.includes(AUTHORISED_ADMIN_GROUP) ||
      groups.includes(AUTHORISED_DEV_GROUP),
    hasAdultPermissions: groups.includes(AUTHORISED_ADULT_GROUP),
    hasChildrenPermissions: groups.includes(AUTHORISED_CHILD_GROUP),
    hasAllocationsPermissions:
      groups.includes(AUTHORISED_ALLOCATORS_GROUP) ||
      // children users don't need to be part of allocator group to be able to allocate
      groups.includes(AUTHORISED_CHILD_GROUP),
    hasUnrestrictedPermissions: groups.includes(AUTHORISED_UNRESTRICTED_GROUP),
    isAuditable: groups.includes(AUTHORISED_AUDITABLE_GROUP),
    isInWorkflowsPilot: groups.includes(AUTHORISED_WORKFLOWS_PILOT_GROUP),
    isInSafeguardingReviewing: groups.includes(
      AUTHORISED_SAFEGUARDING_REVIEWING_GROUP
    ),
    isInPlacementManagementUnit: groups.includes(
      AUTHORISED_PLACEMENT_MANAGEMENT_UNIT_GROUP
    ),
  };
  return {
    ...gssUser,
    permissionFlag: getPermissionFlag(gssUser),
    isAuthorised:
      gssUser.hasDevPermissions ||
      gssUser.hasAdminPermissions ||
      gssUser.hasAdultPermissions ||
      gssUser.hasChildrenPermissions,
    name,
    email,
  };
};
