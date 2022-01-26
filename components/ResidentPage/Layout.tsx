import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { Resident } from 'types';
import s from './Layout.module.scss';
import { useAllocatedWorkers } from 'utils/api/allocatedWorkers';
import AddFormDialog from 'components/AddFormDialog/AddFormDialog';
import { useState } from 'react';
import CaseStatusFlag from 'components/CaseStatus/CaseStatusFlag/CaseStatusFlag';

import {
  prettyAddress,
  prettyResidentName,
  summariseAllocations,
} from 'lib/formatters';
import ActivityTimeline from './ActivityTimeline';

interface NavLinkProps {
  href: string;
  children: React.ReactChild | React.ReactChild[];
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

interface Props {
  resident: Resident;
  children: React.ReactChild[];
}

const Layout = ({ resident, children }: Props): React.ReactElement => {
  const { data: allocations } = useAllocatedWorkers(resident.id);
  const [addFormOpen, setAddFormOpen] = useState<boolean>(false);

  const navigation: { text: string; href: string }[] = [
    { text: 'Overview', href: `/residents/${resident.id}` },
    { text: 'Workflows', href: `/residents/${resident.id}/workflows` },
    {
      text: 'Case notes & records',
      href: `/residents/${resident.id}/case-notes`,
    },
    {
      text: `Allocations`,
      href: `/residents/${resident.id}/allocations`,
    },
    { text: 'Relationships', href: `/residents/${resident.id}/relationships` },
  ];

  const secondaryNavigation = [
    {
      text: 'Shareable version',
      href: `/people/${resident.id}/warning-notes/add?id=${resident.id}`,
    },
    {
      text: 'Add case note',
      href: `/people/${resident.id}/case-note`,
    },
    {
      text: 'Add a case status',
      href: `/people/${resident.id}/case-status/add`,
    },
  ];

  return (
    <>
      <Head>
        <title>
          <>{prettyResidentName(resident)} | Social care | Hackney Council</>
        </title>
      </Head>

      <AddFormDialog
        isOpen={addFormOpen}
        onDismiss={() => setAddFormOpen(false)}
        person={resident}
      />

      <div
        className={`govuk-grid-row govuk-!-margin-bottom-8 ${s.residentHeader}`}
      >
        <div className={`govuk-grid-column-two-thirds ${s.masthead}`}>
          <h1>{prettyResidentName(resident)}</h1>

          <p className="lbh-body-s">
            #{resident.id}
            {resident.dateOfBirth &&
              ` · Born ${format(new Date(resident.dateOfBirth), 'd MMM yyyy')}`}
            {resident.address && ` · ${prettyAddress(resident)}`}
          </p>

          {allocations?.allocations && (
            <p className="lbh-body-xs">
              {summariseAllocations(allocations.allocations)}
            </p>
          )}

          <CaseStatusFlag person={resident} />
        </div>

        <div className={`govuk-grid-column-one-third ${s.actionsArea}`}>
          <button
            onClick={() => setAddFormOpen(true)}
            className={`govuk-button lbh-button ${s.primaryAction}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M6.94 0L5 0V12H6.94V0Z" />
              <path d="M12 5H0V7H12V5Z" />
            </svg>
            Add something new
          </button>
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

            <ActivityTimeline />
          </nav>
        </div>

        <div className="govuk-grid-column-three-quarters">{children}</div>
      </div>
    </>
  );
};

export default Layout;
