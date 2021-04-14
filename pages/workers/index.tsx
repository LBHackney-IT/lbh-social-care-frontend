import AllocatedCases from 'components/AllocatedCases/AllocatedCases';
import Seo from 'components/Layout/Seo/Seo';
import WorkerSearch from 'components/WorkerView/WorkerSearch';
import React from 'react';
import { useRouter } from 'next/router';
// import WorkerRecap from 'components/WorkerView/WorkerRecap';

const SearchWorkerPage = (): React.ReactElement => (
  <>
    <div>
      <Seo title="Search Worker" />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter govuk-expand-title">
        {' '}
        Manage Workers{' '}
      </h1>
      <p className="govuk-body">
        Before creating or updating a worker in this system, you will need to
        check if their email address already exists in the Social Care System.
      </p>
      <p className="govuk-body">
        Workers also need to be added to an appropriate Google Group which will
        give them the correct permissions to use this system. If this has not
        already been done, contact XXXX
      </p>
    </div>
    <WorkerSearch />
  </>
);

export default SearchWorkerPage;
