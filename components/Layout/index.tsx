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
      <PhaseBanner phase="beta" feedbackLink={feedbackLink} />
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="content" role="main">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
