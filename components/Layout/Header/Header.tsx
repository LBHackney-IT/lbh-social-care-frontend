import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from 'components/UserContext/UserContext';
import { getData } from 'utils/saveData';
import { getUserType } from 'utils/user';
import Logo from './Logo';

const loggedNavLinks = [
  {
    name: 'Search',
    path: '/',
    isSelected: ({ asPath, pathname }: { asPath: string; pathname: string }) =>
      pathname === '/' ||
      (pathname === '/cases' && asPath !== '/cases?my_notes_only=true'),
  },
  {
    name: 'My records',
    path: '/cases?my_notes_only=true',
    isSelected: ({ asPath }: { asPath: string }) =>
      asPath === '/cases?my_notes_only=true',
  },
  {
    name: 'Forms in progress',
    path: '/form-in-progress',
  },
  {
    name: 'Manage workers',
    path: '/workers',
  },
  {
    name: 'Logout',
    path: '/logout',
  },
];

const HeaderComponent = ({
  serviceName,
}: {
  serviceName: string;
}): React.ReactElement => {
  const { user } = useAuth();
  const { pathname, asPath } = useRouter();
  const [navLinks, setNavLinks] = useState<typeof loggedNavLinks>();
  useEffect(() => {
    if (user) {
      const savedForms = getData();
      setNavLinks(
        loggedNavLinks
          .filter(({ name }) => name !== 'Forms in progress' || savedForms)
          .filter(
            ({ name }) => name !== 'Manage workers' || user.hasDevPermissions
          )
      );
    }
  }, [user, pathname]);
  return (
    <header className="lbh-header ">
      <div className="lbh-header__main">
        <div className="lbh-container lbh-header__wrapper">
          <div className="lbh-header__title">
            <a href="/" className="lbh-header__title-link">
              <Logo />
              <span className="lbh-header__logo-text"> Hackney </span>
              <span className="lbh-header__service-name">Social care</span>
              <span className="govuk-tag lbh-tag">
                {user && getUserType(user)}
              </span>
            </a>
          </div>
          <nav className="lbh-header__links" aria-label="Navigation menu">
            {navLinks && (
              <>
                {navLinks.map(({ name, path, isSelected }) => (
                  <Link href={path} key={path}>
                    <a className="govuk-header__link">{name}</a>
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
