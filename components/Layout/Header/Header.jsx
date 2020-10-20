import HackneyLogo from './HackneyLogo';

const Header = ({ serviceName }) => (
  <header className="govuk-header" role="banner" data-module="govuk-header">
    <div className="govuk-header__container govuk-width-container lbh-header__container">
      <div className="govuk-header__logo">
        <a href="/" className="govuk-header__link govuk-header__link--homepage">
          <span className="govuk-header__logotype lbh-header__logotype">
            <HackneyLogo />
          </span>
        </a>
      </div>
      <div className="govuk-header__content">
        <a
          href="/"
          className="govuk-header__link govuk-header__link--service-name"
        >
          {serviceName}
        </a>
      </div>
    </div>
  </header>
);

export default Header;
