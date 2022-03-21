import Seo from 'components/Layout/Seo/Seo';
import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import { isBrowser } from 'utils/ssr';
import { canUserAllocateWorkerToPerson } from 'lib/permissions';
import { User } from 'types';
import { useResident } from 'utils/api/residents';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import React from 'react';
import AddWorkerAllocation from 'components/Allocations/AddWorkerAllocation/AddWorkerAllocation';

const AddNewAllocationPage = (): React.ReactElement => {
  const { query, replace } = useRouter();
  const personId = Number(query.id as string);
  const allocationId = Number(query.allocationId as string);
  const { user } = useAuth() as { user: User };
  const { data: resident, error } = useResident(personId);

  if (error) {
    return <ErrorMessage />;
  }

  if (!resident) {
    return <Spinner />;
  }

  if (isBrowser() && !canUserAllocateWorkerToPerson(user, resident)) {
    replace(`/resident/${personId}`).catch((e) => {
      throw e;
    });
    return <></>;
  }

  const teamAllocationStartDate = String(query.teamAllocationStartDate);
  const teamId = Number(query.teamId);

  return (
    <>
      <Seo title={`Allocate Worker to #${query.id} Allocate Worker`} />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Allocate a worker
      </h1>
      <PersonView personId={personId} expandView>
        {(resident) => (
          <div className="govuk-!-margin-top-7">
            <AddWorkerAllocation
              teamAllocationStartDate={new Date(teamAllocationStartDate)}
              personId={resident.id}
              teamId={teamId}
              allocationId={allocationId}
            />
          </div>
        )}
      </PersonView>
    </>
  );
};

AddNewAllocationPage.goBackButton = true;

export default AddNewAllocationPage;
