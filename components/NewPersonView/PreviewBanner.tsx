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
            <Link
              href={
                'https://docs.google.com/forms/d/e/1FAIpQLScILbPD1ioKHzp1D3HN4_DKaxV2tpWLMu8upSSqNgSPCo85cg/viewform'
              }
            >
              <a className="govuk-!-margin-left-3">Give feedback</a>
            </Link>
          </p>
        </div>
      </section>
    );
  return null;
};

export default PreviewBanner;
