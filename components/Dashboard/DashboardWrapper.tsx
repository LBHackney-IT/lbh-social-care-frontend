import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import s from './DashboardWrapper.module.scss';
import MyData from './MyData';
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
  { text: 'My work', href: '/' },
  {
    text: `Teams`,
    href: `/teams`,
  },
];

interface Props {
  children: React.ReactChild;
}

const DashboardWrapper = ({ children }: Props): React.ReactElement => {
  const { getConfigValue } = useAppConfig();

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

                <NavLink href={getConfigValue('workflowsPilotUrl') as string}>
                  Workflows
                </NavLink>
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
