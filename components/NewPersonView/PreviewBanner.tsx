import { useFeatureFlags } from 'lib/feature-flags/feature-flags';
import Link from 'next/link';
import React from 'react';
import { Resident } from 'types';

const PreviewBanner = ({
  resident,
}: {
  resident: Resident;
}): React.ReactElement | null => {
  const { isFeatureActive } = useFeatureFlags();

  if (
    isFeatureActive('preview-new-resident-view') &&
    resident.contextFlag !== 'C'
  )
    return (
      <section
        role="alert"
        className="lbh-page-announcement lbh-page-announcement--orange"
      >
        <h4 className="lbh-page-announcement__title">
          Try the faster, brand new resident view
        </h4>
        <div className="lbh-page-announcement__content">
          <p className="lbh-body-s">
            You can record much more information about a resident, see a
            chronology of their workflows and browse case notes faster.
          </p>
          <p className="lbh-body-s govuk-!-margin-top-2">
            <Link href={`/residents/${resident.id}`}>Try it now</Link>
          </p>
        </div>
      </section>
    );
  return null;
};

export default PreviewBanner;
