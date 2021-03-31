import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from 'components/UserContext/UserContext';
import { getData } from 'utils/saveData';
// import { getUserType } from 'utils/user';
import Logo from './Logo';

const loggedNavLinks = [
  {
    name: 'My records',
    path: '/cases?my_notes_only=true',
  },
  {
    name: 'Forms in progress',
    path: '/form-in-progress',
  },
];

const HeaderComponent = (): React.ReactElement => {
  const { user } = useAuth();
  const { pathname } = useRouter();
  const [navLinks, setNavLinks] = useState<typeof loggedNavLinks>();
  useEffect(() => {
    if (user) {
      const savedForms = getData();
      setNavLinks(
        savedForms
          ? loggedNavLinks
          : loggedNavLinks.filter(({ name }) => name !== 'Forms in progress')
      );
    }
  }, [user, pathname]);
  return (
    <header className="lbh-header ">
      <div className="lbh-header__main">
        <div className="lbh-container lbh-header__wrapper lbh-header__wrapper--stacked">
          <div className="lbh-header__title">
            <Link href="/">
              <a className="lbh-header__title-link">
                <Logo />

                <span className="lbh-header__logo-text"> Hackney </span>
                <span className="lbh-header__service-name">Social care</span>
              </a>
            </Link>
          </div>
          <div className="lbh-header__links">
            {navLinks && (
              <>
                {navLinks.map(({ name, path }) => (
                  <Link href={path} key={path}>
                    <a>{name}</a>
                  </Link>
                ))}
                <Link href="/logout">
                  <a>Sign out</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
