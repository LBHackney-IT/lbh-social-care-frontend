import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';
import EditCaseStatusForm from 'components/CaseStatus/EditCaseStatusForm/EditCaseStatusForm';
import AnnouncementMessage from 'components/AnnouncementMessage/AnnouncementMessage';
import { capitalize } from 'utils/strings';

const EditCaseStatus = (): React.ReactElement => {
  const [isScheduledCaseStatus, setIsScheduledCaseStatus] = useState(false);

  const router = useRouter();
  const personId = Number(router.query.id as string);
  const type = String(router.query.type as string);
  const caseStatusId = Number(router.query.caseStatusId as string);
  const currentCaseStatusStartDate = String(
    router.query.currentCaseStatusStartDate
  );
  const pastCaseStatusStartDate = String(router.query.pastCaseStatusStartDate);
  let action = String(router.query.action as string);

  useEffect(() => {
    setIsScheduledCaseStatus(
      Boolean(Number(router.query.isScheduledCaseStatus))
    );
  }, [router.query.isScheduledCaseStatus]);

  let prefilledFields;
  if (router.query.prefilledFields) {
    prefilledFields = JSON.parse(router.query.prefilledFields.toString());
  }
  if (prefilledFields && prefilledFields.action) {
    action = String(prefilledFields.action);
    action.charAt(0).toUpperCase();
  }

  return (
    <>
      {pastCaseStatusStartDate &&
        pastCaseStatusStartDate !== 'undefined' &&
        action == 'edit' && (
          <AnnouncementMessage
            title="Changes made here may affect previous status items"
            content="Changing the start date of the current case status will also change the end date of the previous case status"
          />
        )}
      {isScheduledCaseStatus && action == 'end' && (
        <AnnouncementMessage
          title="An update has already been scheduled for this status"
          content="Any changes you make here will overwrite the scheduled update"
        />
      )}
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        {capitalize(action)} a case status
      </h1>
      <PersonView personId={personId} expandView>
        <EditCaseStatusForm
          caseStatusId={caseStatusId}
          personId={personId}
          prefilledFields={prefilledFields}
          action={action}
          caseStatusType={type}
          currentCaseStatusStartDate={currentCaseStatusStartDate}
          pastCaseStatusStartDate={pastCaseStatusStartDate}
        />
      </PersonView>
    </>
  );
};

export default EditCaseStatus;
