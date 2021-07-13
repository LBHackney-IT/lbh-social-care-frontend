import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { AllocationData, Resident } from 'types';
import s from './index.module.scss';
import { useRelationships } from 'utils/api/relationships';
import { useAllocatedWorkers } from 'utils/api/allocatedWorkers';
import React from 'react';
import WarningNotes from 'components/WarningNote/WarningNotes';

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

const summariseAllocations = (allocations): string | null => {
  if (allocations?.length === 1)
    return ` · Allocated to ${allocations[0].allocatedWorker}`;
  if (allocations?.length > 1)
    return ` · Allocated to ${allocations[0].allocatedWorker} and ${
      allocations?.length - 1
    } others`;
  return null;
};

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

  const secondaryNavigation = [
    {
      text: 'Add warning note',
      href: `/people/${person.id}/warning-notes/add?id=${person.id}`,
    },
  ];

  return (
    <>
      <Head>
        <title>
          {person.firstName} {person.lastName} | Social care | Hackney Council
        </title>
      </Head>

      <WarningNotes id={person.id} />

      <div
        className={`govuk-grid-row govuk-!-margin-bottom-8 ${s.personHeader}`}
      >
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1">
            {person.firstName} {person.lastName}
          </h1>
          <p
            className={`govuk-caption-m govuk-!-margin-top-3 ${s.personCaption}`}
          >
            #{person.id}
            {person.dateOfBirth &&
              ` · Born ${format(new Date(person.dateOfBirth), 'dd MMM yyyy')}`}
            {allocations?.allocations &&
              summariseAllocations(allocations.allocations)}
          </p>
        </div>

        <div className={`govuk-grid-column-one-third ${s.actionsArea}`}>
          <Link href={`/people/${person.id}/records`}>
            <a className={`govuk-button lbh-button ${s.primaryAction}`}>
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M6.94 0L5 0V12H6.94V0Z" />
                <path d="M12 5H0V7H12V5Z" />
              </svg>
              Add something new
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
              {secondaryNavigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="lbh-link lbh-body-s lbh-link--no-visited-state"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="govuk-grid-column-three-quarters">{children}</div>
      </div>
    </>
  );
};

export default Layout;
