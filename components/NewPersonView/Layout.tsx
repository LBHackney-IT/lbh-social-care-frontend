import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { Resident, User, CaseStatus } from 'types';
import s from './index.module.scss';
import { useRelationships } from 'utils/api/relationships';
import { useAllocatedWorkers } from 'utils/api/allocatedWorkers';
import { useCaseStatuses } from 'utils/api/caseStatus';
import React from 'react';
import WarningNotes from 'components/WarningNotes/WarningNotes';
import { useAuth } from 'components/UserContext/UserContext';
import { canManageCases } from 'lib/permissions';
import AddFormDialog from 'components/AddFormDialog/AddFormDialog';
import { useState } from 'react';
import Banner from 'components/FlexibleForms/Banner';
import { summariseAllocations } from 'lib/formatters';
import {
  ConditionalFeature,
  useFeatureFlags,
} from 'lib/feature-flags/feature-flags';
import CaseStatusFlag from 'components/CaseStatus/CaseStatusFlag/CaseStatusFlag';
import { useAppConfig } from 'lib/appConfig';
import ConfirmationBanner from 'components/ConfirmationBanner/ConfirmationBanner';

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

interface Props {
  person: Resident;
  children: React.ReactChild;
}

const Layout = ({ person, children }: Props): React.ReactElement => {
  const { data: allocations } = useAllocatedWorkers(person.id);
  const { data: relationships } = useRelationships(person.id);
  const { data: casestatus } = useCaseStatuses(person.id);
  const { user } = useAuth() as { user: User };
  const { isFeatureActive } = useFeatureFlags();
  const [addFormOpen, setAddFormOpen] = useState<boolean>(false);
  const { getConfigValue } = useAppConfig();
  const router = useRouter();

  const case_note_deleted = Boolean(router.query.case_note_deleted);

  const navigation: { text: string; href: string }[] = [
    {
      text: `Allocations ${
        allocations?.allocations ? `(${allocations?.allocations?.length})` : ''
      }`,
      href: `/people/${person.id}/allocations`,
    },
    {
      text: `Relationships ${
        relationships?.personalRelationships &&
        relationships?.personalRelationships.length > 0
          ? `(${relationships?.personalRelationships.reduce(
              (count, current) => count + current.relationships.length,
              0
            )})`
          : ''
      }`,
      href: `/people/${person.id}/relationships`,
    },
    { text: 'Details', href: `/people/${person.id}/details` },
  ];

  if (canManageCases(user, person))
    navigation.unshift({
      text: 'Timeline',
      href: `/people/${person.id}`,
    });

  const secondaryNavigation = [
    {
      text: 'Add warning note',
      href: `/people/${person.id}/warning-notes/add?id=${person.id}`,
    },
    {
      text: 'Add case note',
      href: `/people/${person.id}/case-note`,
    },
  ];

  if (
    isFeatureActive('case-status') &&
    casestatus &&
    groupCaseStatusByType(casestatus).size == 0 &&
    person.contextFlag === 'C'
  ) {
    secondaryNavigation.push({
      text: 'Add a case status',
      href: `/people/${person.id}/case-status/add`,
    });
  }

  return (
    <>
      <Head>
        <title>
          <>
            {person.firstName} {person.lastName} | Social care | Hackney Council
          </>
        </title>
      </Head>

      <AddFormDialog
        isOpen={addFormOpen}
        onDismiss={() => setAddFormOpen(false)}
        person={person}
      />

      {case_note_deleted == true ? (
        <ConfirmationBanner title="Case note deleted">
          {`Case note "${String(
            router.query.case_note_name
          )}" has been deleted correctly`}
        </ConfirmationBanner>
      ) : (
        <></>
      )}

      <WarningNotes id={person.id} />

      {person.restricted === 'Y' && !canManageCases(user, person) && (
        <Banner
          title="This person is restricted"
          className="lbh-page-announcement--info"
        >
          Only administrators can see this person&apos;s case history.
        </Banner>
      )}

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
              ` · Born ${format(new Date(person.dateOfBirth), 'd MMM yyyy')}`}
            {allocations?.allocations &&
              summariseAllocations(allocations.allocations)}
          </p>

          <ConditionalFeature name="case-status">
            <CaseStatusFlag person={person} />
          </ConditionalFeature>
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

              <NavLink
                href={`${
                  getConfigValue('workflowsPilotUrl') as string
                }/residents/${person.id}`}
              >
                Workflows
              </NavLink>
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

              {user.isInWorkflowsPilot && (
                <li>
                  <a
                    href={`${getConfigValue(
                      'workflowsPilotUrl'
                    )}/workflows/new?social_care_id=${person.id}`}
                    className="lbh-link lbh-body-s lbh-link--no-visited-state"
                  >
                    Start workflow
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="govuk-grid-column-three-quarters">{children}</div>
      </div>
    </>
  );
};

function groupCaseStatusByType(allCasesStatues: CaseStatus[]): any {
  return new Set(allCasesStatues.map((el) => el.type));
}

export default Layout;
