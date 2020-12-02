import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo from './Logo.jsx';

const navLinks = [
  {
    name: 'Search',
    path: '/',
  },
  {
    name: 'My cases',
    path: '/cases?my_notes_only=true',
  },
  {
    name: 'Forms in progress',
    path: '/',
  },
  {
    name: 'Logout',
    path: '/logout',
  },
];

const HeaderComponent = ({ serviceName }) => {
  const { asPath } = useRouter();
  return (
    <header className="govuk-header" role="banner" data-module="govuk-header">
      <div className="govuk-header__container">
        <div className="govuk-width-container">
          <div className="govuk-header__logo">
            <Link href="/">
              <a className="govuk-header__link govuk-header__link--homepage">
                <span className="govuk-header__logotype">
                  <Logo />
                </span>
              </a>
            </Link>
          </div>
          <div className="govuk-header__content">
            <Link href="/">
              <a className="govuk-header__link govuk-header__link--service-name">
                {serviceName}
              </a>
            </Link>
            <button
              type="button"
              className="govuk-header__menu-button govuk-js-header-toggle"
              aria-controls="navigation"
              aria-label="Show or hide navigation menu"
            >
              Menu
            </button>
            <nav>
              <ul
                id="navigation"
                className="govuk-header__navigation "
                aria-label="Navigation menu"
              >
                {navLinks.map(({ name, path }) => (
                  <li
                    key={path}
                    className={cx('govuk-header__navigation-item', {
                      'govuk-header__navigation-item--active': path === asPath,
                    })}
                  >
                    <Link href={path}>
                      <a className="govuk-header__link">{name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
