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
    path: '/search',
    isSelected: (pathname: string) =>
      pathname === '/search' || pathname === '/cases',
  },
  // TODO: uncomment when dashboard is ready to launch
  // {
  //   name: 'My work space',
  //   path: '/',
  //   isSelected: (pathname: string) =>
  //     pathname === '/' ||
  //     pathname === '/my-records' ||
  //     pathname === '/forms-in-progress',
  // },
  {
    name: 'Manage workers',
    path: '/workers',
  },
  {
    name: 'Sign out',
    path: '/logout',
  },
];

const HeaderComponent = ({
  serviceName,
}: {
  serviceName: string;
}): React.ReactElement => {
  const { user } = useAuth();
  const { pathname } = useRouter();
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
              <span className="lbh-header__service-name">{serviceName}</span>
              {user && (
                <span className="govuk-tag lbh-tag lbh-tag--green">
                  {getUserType(user)}
                </span>
              )}
            </a>
          </div>
          <nav className="lbh-header__links" aria-label="Navigation menu">
            {navLinks && (
              <>
                {navLinks.map(({ name, path }) => (
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
