import cookie from 'cookie';
import jsonwebtoken from 'jsonwebtoken';

import { getPermissionFlag } from 'utils/user';

export const AUTH_WHITELIST = ['/login', '/access-denied'];

const { GSSO_TOKEN_NAME } = process.env;

export const deleteSession = (res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(GSSO_TOKEN_NAME, null, {
      maxAge: -1,
      domain: '.hackney.gov.uk',
    })
  );
  res.writeHead(302, {
    Location: '/login',
  });
  res.end();
};

export const isAuthorised = (req) => {
  const {
    HACKNEY_JWT_SECRET,
    AUTHORISED_ADMIN_GROUP,
    AUTHORISED_ADULT_GROUP,
    AUTHORISED_CHILD_GROUP,
    AUTHORISED_ALLOCATORS_GROUP,
  } = process.env;
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const parsedToken =
    cookies[GSSO_TOKEN_NAME] &&
    jsonwebtoken.verify(cookies[GSSO_TOKEN_NAME], HACKNEY_JWT_SECRET);
  if (!parsedToken) {
    return null;
  }
  const { groups = [], name, email } = parsedToken;
  const gssUser = {
    hasAdminPermissions: groups.includes(AUTHORISED_ADMIN_GROUP),
    hasAdultPermissions: groups.includes(AUTHORISED_ADULT_GROUP),
    hasChildrenPermissions: groups.includes(AUTHORISED_CHILD_GROUP),
    hasAllocationsPermissions: groups.includes(AUTHORISED_ALLOCATORS_GROUP),
  };
  return {
    ...gssUser,
    permissionFlag: getPermissionFlag(gssUser),
    isAuthorised:
      gssUser.hasAdminPermissions ||
      gssUser.hasAdultPermissions ||
      gssUser.hasChildrenPermissions,
    name,
    email,
  };
};
