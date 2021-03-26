import Seo from './Seo/Seo';
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
      <Seo title="Social Care Admin - Hackney Council" />
      <SkipLink />
      <Header serviceName="Social Care" />
      <div className="govuk-width-container">
        <PhaseBanner phase="beta" feedbackLink={feedbackLink} />
        <main className="govuk-main-wrapper" id="content" role="main">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
