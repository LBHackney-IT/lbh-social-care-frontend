import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import s from './DashboardWrapper.module.scss';
import MyData from './MyData';
import { ConditionalFeature } from 'lib/feature-flags/feature-flags';
import { useAppConfig } from 'lib/appConfig';

interface NavLinkProps {
  href: string;
  children: React.ReactChild;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const router = useRouter();
  return (
    <li>
      <Link href={href}>
        <a
          className={`lbh-link lbh-link--no-visited-state ${
            router.asPath === href ? s.navLinkActive : s.navLink
          }`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

const navigation: { text: string; href: string }[] = [
  {
    text: `Allocations`,
    href: `/`,
  },
  {
    text: `Work in progress`,
    href: `/work-in-progress`,
  },
  { text: 'My work', href: '/my-work' },
];

interface Props {
  children: React.ReactChild;
}

const DashboardWrapper = ({ children }: Props): React.ReactElement => {
  const { getConfigValue } = useAppConfig();

  let navLink;

  try {
    navLink = (
      <NavLink href={getConfigValue('workflowsPilotUrl') as string}>
        Workflows
      </NavLink>
    );
  } catch (error) {
    navLink = null;
  }

  return (
    <>
      <Head>
        <title>Dashboard | Social care | Hackney Council</title>
      </Head>

      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-one-quarter">
          <div className={s.sticky}>
            <nav>
              <ul className="lbh-list">
                {navigation.map((link) => (
                  <NavLink href={link.href} key={link.href}>
                    {link.text}
                  </NavLink>
                ))}

                <ConditionalFeature name="workflows-pilot">
                  {navLink}
                </ConditionalFeature>
              </ul>
            </nav>
            <MyData />
          </div>
        </div>
        <div className="govuk-grid-column-three-quarters">{children}</div>
      </div>
    </>
  );
};

export default DashboardWrapper;
