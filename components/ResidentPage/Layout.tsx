import Head from 'next/head';
import { format } from 'date-fns';
import { Resident } from 'types';
import s from './Layout.module.scss';
import { useAllocatedWorkers } from 'utils/api/allocatedWorkers';
import AddFormDialog from 'components/AddFormDialog/AddFormDialog';
import { useState } from 'react';
import {
  prettyAddress,
  prettyResidentName,
  summariseAllocations,
} from 'lib/formatters';
import ActivityTimeline from './ActivityTimeline';
import NavLink from './NavLink';
import Tip from 'components/Tip/Tip';
import StatusTags from './StatusTags';
import WarningNotes from './WarningNotes';

interface Props {
  resident: Resident;
  children: React.ReactChild | React.ReactChild[];
  title?: string;
}

const Layout = ({ title, resident, children }: Props): React.ReactElement => {
  const { data: allocations } = useAllocatedWorkers(resident.id);
  const [addFormOpen, setAddFormOpen] = useState<boolean>(false);

  const navigation = [
    { text: 'Overview', href: `/residents/${resident.id}` },
    {
      text: 'Workflows',
      href: `/residents/${resident.id}/workflows`,
      tip: "A timeline of the resident's care, assessments and support plans",
    },
    {
      text: 'Case notes & records',
      href: `/residents/${resident.id}/case-notes`,
      tip: 'You can also find old Google form submissions here',
    },
    {
      text: `Allocations`,
      href: `/residents/${resident.id}/allocations`,
    },
    { text: 'Relationships', href: `/residents/${resident.id}/relationships` },
  ];

  const secondaryNavigation = [
    // {
    //   text: 'Shareable version',
    //   href: `/people/${resident.id}/warning-notes/add?id=${resident.id}`,
    //   tip: "A handy printer-friendly view of this resident's info",
    // },
    {
      text: 'Add case note',
      href: `/people/${resident.id}/case-note`,
    },
  ];

  return (
    <>
      <Head>
        <title>
          {title && `${title} | `}
          {prettyResidentName(resident)} | Social care | Hackney Council
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
              {resident.allocatedTeam && ` · ${resident.allocatedTeam}`}
            </p>
          )}

          <StatusTags resident={resident} allocations={allocations} />

          {/* <CaseStatusFlag person={resident} /> */}
        </div>

        <div className={`govuk-grid-column-one-third ${s.actionsArea}`}>
          <Tip content="Add case notes, assessments, warning notes or other records">
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
          </Tip>
        </div>
      </div>

      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-one-quarter">
          <nav className={s.sticky}>
            <ul className="lbh-list">
              {navigation.map((link) => (
                <NavLink href={link.href} key={link.href} tip={link.tip}>
                  {link.text}
                </NavLink>
              ))}
            </ul>

            <ul className={`lbh-list ${s.secondaryNav}`}>
              {secondaryNavigation.map((link) => (
                <NavLink
                  href={link.href}
                  key={link.href}
                  tip={link.tip}
                  secondary
                >
                  {link.text}
                </NavLink>
              ))}
            </ul>

            <ActivityTimeline socialCareId={resident.id} />
          </nav>
        </div>

        <div className="govuk-grid-column-three-quarters">
          <WarningNotes socialCareId={resident.id} />

          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
