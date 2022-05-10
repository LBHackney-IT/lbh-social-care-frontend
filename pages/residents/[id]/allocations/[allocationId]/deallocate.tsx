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
import DeallocateTeamWorker from 'components/Allocations/DeallocateTeamWorker/DeallocateTeamWorker';

const DeAllocationPage = (): React.ReactElement => {
  const { query, replace } = useRouter();
  const personId = Number(query.id as string);
  const allocationId = Number(query.allocationId as string);
  const type = String(query.type);
  const allocationStartDate = String(query.allocationStartDate);
  const allocatedWorkerTeam =
    query.allocatedWorkerTeam && String(query.allocatedWorkerTeam);
  const allocatedWorker =
    query.allocatedWorker && String(query.allocatedWorker);

  const { user } = useAuth() as { user: User };
  const { data: resident, error } = useResident(personId);

  if (!type) {
    return <ErrorMessage label={'Type of deallocation not specified'} />;
  }

  if (error) {
    return <ErrorMessage label={error.message} />;
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

  return (
    <>
      <Seo title={`Allocate Worker to #${query.id} Allocate Worker`} />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        {`Deallocate a ${type}`}
      </h1>
      <PersonView personId={personId} expandView>
        {(resident) => (
          <div className="govuk-!-margin-top-7">
            <DeallocateTeamWorker
              type={type}
              resident={resident}
              allocatedWorkerTeam={allocatedWorkerTeam}
              allocatedWorker={allocatedWorker}
              allocationStartDate={new Date(allocationStartDate)}
              allocationId={allocationId}
            />
          </div>
        )}
      </PersonView>
    </>
  );
};

DeAllocationPage.goBackButton = true;

export default DeAllocationPage;
