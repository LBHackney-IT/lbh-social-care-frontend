import { getCookies, removeCookies } from 'cookies-next';
import jsonwebtoken from 'jsonwebtoken';
import Router from 'next/router';

const { GSSO_TOKEN_NAME } = process.env;

export const redirectToHome = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
  } else {
    Router.push('/');
  }
};

export const redirectToLogin = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: '/login',
    });
    res.end();
  } else {
    Router.push('/login');
  }
};

export const redirectToAcessDenied = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: '/access-denied',
    });
    res.end();
  } else {
    Router.push('/access-denied');
  }
};

export const deleteSession = (ctx) => {
  removeCookies(ctx, GSSO_TOKEN_NAME, {
    path: '/',
    domain: '.hackney.gov.uk',
  });

  redirectToLogin(ctx);
};

export const isAuthorised = (ctx) => {
  const { HACKNEY_JWT_SECRET, AUTHORISED_ADMIN_GROUP } = process.env;

  let gssoUserObj = {
    isAuthorised: false,
    name: '',
    email: '',
    isAdmin: false,
  };

  const token = getCookies(ctx, GSSO_TOKEN_NAME);

  try {
    if (token) {
      try {
        let payload = jsonwebtoken.verify(token, HACKNEY_JWT_SECRET);
        const groups = payload.groups;

        // User is authorised if in the group
        if (groups && groups.includes(AUTHORISED_ADMIN_GROUP)) {
          gssoUserObj = {
            isAuthorised: true,
            name: payload.name,
            email: payload.email,
            isAdmin: true,
          };
        } else {
          redirectToAcessDenied(ctx);
        }
      } catch (err) {
        if (err instanceof jsonwebtoken.JsonWebTokenError) {
          redirectToLogin(ctx);
        } else {
          console.log(err.message);
        }
      }
    }

    return gssoUserObj;
  } catch (e) {
    console.error(e.message);
    redirectToLogin(ctx);
  }
};
