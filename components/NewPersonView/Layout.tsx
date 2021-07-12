import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { Resident } from 'types';
import s from './index.module.scss';
import { useRelationships } from 'utils/api/relationships';
import { useAllocatedWorkers } from 'utils/api/allocatedWorkers';

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
          className={`lbh-link lbh-link--no-visited-state lbh-body-l ${
            router.asPath === href && `govuk-!-font-weight-bold`
          }`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

interface Props {
  person: Resident;
  children: React.ReactChild;
}

const Layout = ({ person, children }: Props): React.ReactElement => {
  const { data: allocations, error: allocationError } = useAllocatedWorkers(
    person.id
  );
  const { data: relationships, error: relationshipsError } = useRelationships(
    person.id
  );

  const navigation = [
    { text: 'Timeline', href: `/people/${person.id}` },
    {
      text: `Allocations ${
        allocations?.allocations ? `(${allocations?.allocations?.length})` : ''
      }`,
      href: `/people/${person.id}/allocations`,
    },
    {
      text: `Relationships ${
        relationships?.personalRelationships
          ? `(${relationships?.personalRelationships?.length})`
          : ''
      }`,
      href: `/people/${person.id}/relationships`,
    },
    { text: 'Details', href: `/people/${person.id}/details` },
  ];

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

        <div className="govuk-grid-column-one-third">
          <Link href={`/people/${person.id}/records`}>
            <a
              className={`govuk-button lbh-button ${s.action} ${s.primaryAction}`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M6.94 0L5 0V12H6.94V0Z" />
                <path d="M12 5H0V7H12V5Z" />
              </svg>
              Add case note
            </a>
          </Link>

          <Link href={`/people/${person.id}/records`}>
            <a
              className={`govuk-button lbh-button lbh-button--secondary lbh-button--add  ${s.action}`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M6.94 0L5 0V12H6.94V0Z" />
                <path d="M12 5H0V7H12V5Z" />
              </svg>
              Add something else
            </a>
          </Link>
        </div>
      </div>
      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-one-quarter">
          <nav className={s.sticky}>
            <ul className="lbh-list">
              {navigation.map((link) => (
                <NavLink href={link.href} key={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </ul>

            <ul className={`lbh-list ${s.secondaryNav}`}>
              <li>
                <a href="#" className="lbh-link lbh-body-s">
                  Example action link
                </a>
              </li>
              <li>
                <a href="#" className="lbh-link lbh-body-s">
                  Another example action
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="govuk-grid-column-three-quarters">{children}</div>
      </div>
    </>
  );
};

export default Layout;
