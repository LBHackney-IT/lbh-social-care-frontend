import Seo from './Seo/Seo';
import Header from './Header/Header';
import SkipLink from './SkipLink/SkipLink';
import PhaseBanner from './PhaseBanner/PhaseBanner';
import BackButton from './BackButton/BackButton';
import Footer from './Footer/Footer';
import OnboardingDialog from 'components/OnboardingDialog';
import { User } from 'types';
import { useAuth } from 'components/UserContext/UserContext';
import SiteWideAnnouncement from 'components/SitewideAnnouncement/SitewideAnnouncement';

export interface Props {
  children: React.ReactChild;
  goBackButton: boolean;
  noLayout: boolean;
}

const Layout = ({
  children,
  goBackButton = false,
  noLayout = false,
}: Props): React.ReactElement => {
  const { user } = useAuth() as { user: User };

  if (noLayout) return <>{children}</>;
  const faqLink =
    'https://docs.google.com/document/d/1eM2anY9Ddot79Gl1N386ANG6ahyn4gjZr6vsoQQGLZg/edit#';
  const handbookLink =
    'https://docs.google.com/presentation/d/1AiTljatPK58xBk2Y7R9h9mUwDpusekv2jkuCgwMWpGk/edit#slide=id.gebf6791975_1_135';

  return (
    <>
      <Seo title="Social Care Admin - Hackney Council" />
      <SkipLink />
      <Header serviceName="Social Care" />
      <PhaseBanner
        phase="support"
        faqLink={faqLink}
        handbookLink={handbookLink}
      />
      <SiteWideAnnouncement />
      {goBackButton && <BackButton />}

      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="content" role="main">
          {children}
        </main>
      </div>

      {user?.isInWorkflowsPilot && <OnboardingDialog />}

      <Footer />
    </>
  );
};

export default Layout;
