import Dialog from 'components/Dialog/Dialog';
import SearchBox from 'components/SubmissionsTable/SearchBox';
import useSearch from 'hooks/useSearch';
import { useState } from 'react';
import { Resident, User } from 'types';
import s from './AddFormDialog.module.scss';
import Link from 'next/link';
import { useMemo, useEffect } from 'react';
import { useAuth } from 'components/UserContext/UserContext';

import ADULT_GFORMS from 'data/googleForms/adultForms';
import CHILD_GFORMS from 'data/googleForms/childForms';
import flexibleForms from 'data/flexibleForms';

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
  person: Resident;
}

const AddFormDialog = ({
  person,
  isOpen,
  onDismiss,
}: Props): React.ReactElement => {
  const { user } = useAuth() as { user: User };
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setSearchQuery('');
  }, [isOpen]);

  const serviceContext = person.contextFlag;
  const gForms = serviceContext === 'A' ? ADULT_GFORMS : CHILD_GFORMS;

  interface Option {
    label: string;
    href: string;
    system: boolean;
    groupRecordable: boolean;
    approvable: boolean;
  }

  const allForms: Option[] = useMemo(
    () =>
      flexibleForms
        .filter((f) => {
          // if user has elevated permissions, show all forms
          if (user.hasAdminPermissions || user.hasDevPermissions) return true;
          // otherwise, only show those relevant to current person's context
          return serviceContext === 'A'
            ? f.isViewableByAdults
            : f.isViewableByChildrens;
        })
        .map((f) => ({
          label: f.name,
          href: f.canonicalUrl
            ? f.canonicalUrl(person.id)
            : `/submissions/new?form_id=${f.id}&social_care_id=${person.id}`,
          system: true,
          groupRecordable: !!f.groupRecordable,
          approvable: !!f.approvable,
        }))
        .concat(
          gForms.map((f) => ({
            label: f.text,
            href: f.value,
            system: false,
            groupRecordable: false,
            approvable: false,
          }))
        ),
    [
      gForms,
      serviceContext,
      user.hasAdminPermissions,
      user.hasDevPermissions,
      person.id,
    ]
  );

  const results = useSearch(
    searchQuery,
    allForms,
    ['label'],
    // more precise threshold gives better results
    { threshold: 0.3 },
    1
  );

  return (
    <Dialog title="Add something new" isOpen={isOpen} onDismiss={onDismiss}>
      <div>
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          label="Search for a form"
          placeholder="Search forms..."
        />
        <p className="lbh-body-xs">
          {results.length} {results.length === 1 ? 'match' : 'matches'}
        </p>
      </div>

      <ul className={s.resultsList}>
        {results.length === 0 && (
          <p className={`lbh-body-l ${s.noMatches}`}>No matches</p>
        )}
        {results.map((result, i) => (
          <li className={s.result} key={i}>
            <Link href={result.href}>
              <a
                target={result.system ? '' : '_blank'}
                className="lbh-link lbh-link--no-visited-state"
              >
                {result.label}
              </a>
            </Link>
            <p className={`lbh-body-xs ${s.meta}`}>
              {result.system ? 'System form' : 'Google form'}
              {result.approvable && ' · Needs manager approval'}
              {result.groupRecordable && ' · Allows group recording'}
            </p>

            <svg width="17" height="27" viewBox="0 0 17 27" fill="none">
              <path d="M2 25L14 13.3806L2 2" strokeWidth="4" />
            </svg>
          </li>
        ))}
      </ul>
    </Dialog>
  );
};

export default AddFormDialog;
