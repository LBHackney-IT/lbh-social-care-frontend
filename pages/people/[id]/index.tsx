import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

interface Props {
  person: Resident;
}

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
            router.pathname === href && `lbh-link--active`
          }`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

const PersonPage = ({ person }: Props): React.ReactElement => {
  const navigation = {
    Timeline: `/people/${person.id}`,
    Relationships: `/people/${person.id}/relationships`,
    Details: `/people/${person.id}/details`,
  };

  return (
    <>
      <Head>
        <title>
          {person.firstName} {person.lastName} | Social care | Hackney Council
        </title>
      </Head>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1">
            {person.firstName} {person.lastName}
          </h1>
          <p className="govuk-caption-m govuk-!-margin-top-3 govuk-!-margin-bottom-8">
            #{person.id}
            {person.dateOfBirth &&
              ` · Born ${format(new Date(person.dateOfBirth), 'dd MMM yyyy')}`}
          </p>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-quarter">
          <nav>
            <ul className="lbh-list">
              {Object.entries(navigation).map(([label, url]) => (
                <NavLink href={url} key={url}>
                  {label}
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>
        <div className="govuk-grid-column-three-quarters">
          <Link href="/">
            <a className="govuk-button lbh-button">
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M6.94 0L5 0V12H6.94V0Z" />
                <path d="M12 5H0V7H12V5Z" />
              </svg>
              Add case note
            </a>
          </Link>
          <Link href="/">
            <a className="govuk-button lbh-button lbh-button--secondary">
              Add something else
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

PersonPage.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const person = await getResident(Number(params?.id));

  if (!person.id) {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  return {
    props: {
      person,
    },
  };
};

export default PersonPage;
