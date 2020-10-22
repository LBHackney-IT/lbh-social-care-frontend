import Footer from './Footer/Footer';
import Header from './Header/Header';
import SkipLink from './SkipLink/SkipLink';
import PhaseBanner from './PhaseBanner/PhaseBanner';

const Layout = ({ children }) => (
  <>
    <SkipLink />
    <Header serviceName="Social Care Service" />
    <div className="govuk-width-container app-width-container">
      <PhaseBanner phase="beta" />
      <main
        className="govuk-main-wrapper app-main-class"
        id="content"
        role="main"
      >
        {children}
      </main>
    </div>
    <Footer />
  </>
);

export default Layout;
