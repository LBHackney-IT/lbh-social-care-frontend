import { useRouter } from 'next/router';
import s from './Footer.module.scss';

const Footer = (): React.ReactElement => {
  const { query } = useRouter();

  return (
    <footer className={`${s.footer}`} role="contentinfo">
      <div className="govuk-width-container">
        <nav className={s.links}>
          <a href="https://sites.google.com/hackney.gov.uk/moderntoolsforsocialcare/home">
            Roadmap
          </a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScILbPD1ioKHzp1D3HN4_DKaxV2tpWLMu8upSSqNgSPCo85cg/viewform">
            Give feedback
          </a>
        </nav>

        <div className={s.meta}>Built and maintained by HackIT.</div>
        {query.footerFlagActive === 'true' && (
          <div className={s.meta}>The Demo Feature Flag is active</div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
