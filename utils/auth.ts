import cookie from 'cookie';
import jsonwebtoken from 'jsonwebtoken';

import type { NextPageContext } from 'next';
import type { User } from 'types';

import { getPermissionFlag } from 'utils/user';

export const AUTH_WHITELIST = ['/login', '/access-denied'];

const { GSSO_TOKEN_NAME } = process.env;

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
  const {
    HACKNEY_JWT_SECRET,
    AUTHORISED_DEV_GROUP,
    AUTHORISED_ADMIN_GROUP,
    AUTHORISED_ADULT_GROUP,
    AUTHORISED_CHILD_GROUP,
    AUTHORISED_ALLOCATORS_GROUP,
    AUTHORISED_UNRESTRICTED_GROUP,
  } = process.env;
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const parsedToken = cookies[GSSO_TOKEN_NAME]
    ? (jsonwebtoken.verify(
        cookies[GSSO_TOKEN_NAME],
        HACKNEY_JWT_SECRET
      ) as ParsedCookie)
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
