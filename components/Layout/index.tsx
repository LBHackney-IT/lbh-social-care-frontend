import Seo from './Seo/Seo';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import SkipLink from './SkipLink/SkipLink';
import PhaseBanner from './PhaseBanner/PhaseBanner';

export interface Props {
  children: React.ReactChild;
}

const Layout = ({ children }: Props): React.ReactElement => {
  const feedbackLink = process.env.NEXT_PUBLIC_FEEDBACK_LINK || '';
  return (
    <>
      <Seo title="Interim Social Care Admin - Hackney Council" />
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
