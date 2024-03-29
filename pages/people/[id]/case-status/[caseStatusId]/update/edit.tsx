import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';
import UpdateCaseStatusForm from 'components/CaseStatus/UpdateCaseStatusForm/UpdateCaseStatusForm';
import AnnouncementMessage from 'components/AnnouncementMessage/AnnouncementMessage';

const EditCaseStatus = (): React.ReactElement => {
  const [isScheduledCaseStatus, setIsScheduledCaseStatus] = useState(false);

  const router = useRouter();
  const personId = Number(router.query.id as string);
  const type = String(router.query.type as string);
  const caseStatusId = Number(router.query.caseStatusId as string);
  const action = String(router.query.action);
  const currentCaseStatusStartDate = String(
    router.query.currentCaseStatusStartDate
  );

  useEffect(() => {
    setIsScheduledCaseStatus(
      Boolean(Number(router.query.isScheduledCaseStatus))
    );
  }, [router.query.isScheduledCaseStatus]);

  let prefilledFields;
  if (router.query.prefilledFields) {
    prefilledFields = JSON.parse(router.query.prefilledFields.toString());
  }

  return (
    <>
      {isScheduledCaseStatus && action === 'update' && (
        <AnnouncementMessage
          title="An update has already been scheduled for this status"
          content="Any changes you make here will overwrite the scheduled update"
        />
      )}
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Update the child&lsquo;s circumstances
      </h1>
      <PersonView personId={personId} expandView>
        <UpdateCaseStatusForm
          caseStatusId={caseStatusId}
          personId={personId}
          prefilledFields={prefilledFields}
          action={action}
          caseStatusType={type}
          currentCaseStatusStartDate={currentCaseStatusStartDate}
        />
      </PersonView>
    </>
  );
};

export default EditCaseStatus;
