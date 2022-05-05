import React from 'react';
import Link from 'next/link';

import { useAuth } from 'components/UserContext/UserContext';
import { getUserType } from 'utils/user';
import Logo from './Logo';
import { canUserManageWorkers } from '../../../lib/permissions';
import { useAppConfig } from 'lib/appConfig';

const HeaderComponent = ({
  serviceName,
}: {
  serviceName: string;
}): React.ReactElement => {
  const { user } = useAuth();
  const { getConfigValue } = useAppConfig();

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

          {user && (
            <nav className="lbh-header__links" aria-label="Navigation menu">
              {canUserManageWorkers(user) && (
                <Link href="/workers">
                  <a className="govuk-header__link">Manage workers</a>
                </Link>
              )}
              <Link href="/">
                <a className="govuk-header__link">My work</a>
              </Link>
              <Link href={getConfigValue('workflowsPilotUrl') as string}>
                <a className="govuk-header__link">Workflows</a>
              </Link>
              <Link href="/teams">
                <a className="govuk-header__link">Teams</a>
              </Link>
              <Link href="/search">
                <a className="govuk-header__link">Search</a>
              </Link>
              <Link href="/logout">
                <a className="govuk-header__link">Sign out</a>
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
