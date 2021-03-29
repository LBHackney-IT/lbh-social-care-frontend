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
    name: 'My records',
    path: '/cases?my_notes_only=true',
    isSelected: ({ asPath }: { asPath: string }) =>
      asPath === '/cases?my_notes_only=true',
  },
  {
    name: 'Forms in progress',
    path: '/form-in-progress',
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
        savedForms && Object.keys(savedForms)?.length > 0
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
                {navLinks.map(({ name, path, isSelected }) => (
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

    // <header className="lbh-header">
    //   <div className="lbh-header__main">
    //     <div className="lbh-container lbh-header__wrapper lbh-header__wrapper--stacked">
    //       <div className="govuk-header__logo">
    //         <Link href="/">
    //           <a className="govuk-header__link govuk-header__link--homepage">
    //             <span className="govuk-header__logotype">
    //               <Logo />
    //             </span>
    //           </a>
    //         </Link>
    //       </div>
    //       <div className="govuk-header__content">
    //         <Link href="/">
    //           <a className="govuk-header__link govuk-header__link--service-name">
    //             {serviceName} {user && getUserType(user)}
    //           </a>
    //         </Link>
    //         {navLinks && (
    //           <>
    //             <button
    //               type="button"
    //               className="govuk-header__menu-button"
    //               aria-controls="navigation"
    //               aria-label="Show or hide navigation menu"
    //             >
    //               Menu
    //             </button>
    //             <nav>
    //               <ul
    //                 id="navigation"
    //                 className="govuk-header__navigation "
    //                 aria-label="Navigation menu"
    //               >
    //                 {navLinks.map(({ name, path, isSelected }) => (
    //                   <li
    //                     key={path}
    //                     className={cx('govuk-header__navigation-item', {
    //                       'govuk-header__navigation-item--active':
    //                         isSelected?.({ asPath, pathname }) ||
    //                         path === pathname,
    //                     })}
    //                   >
    //                     <Link href={path}>
    //                       <a className="govuk-header__link">{name}</a>
    //                     </Link>
    //                   </li>
    //                 ))}
    //               </ul>
    //             </nav>
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </header>
  );
};

export default HeaderComponent;
