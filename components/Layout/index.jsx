import Footer from './Footer/Footer';
import Header from './Header/Header';
import SkipLink from './SkipLink/SkipLink';
import PhaseBanner from './PhaseBanner/PhaseBanner';

const Layout = ({ children }) => {
  const feedbackLink = process.env.NEXT_PUBLIC_FEEDBACK_LINK || '';
  return (
    <>
      <SkipLink />
      <Header serviceName="Interim Social Care" />
      <div className="govuk-width-container app-width-container">
        <PhaseBanner phase="beta" feedbackLink={feedbackLink} />
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
};

export default Layout;
