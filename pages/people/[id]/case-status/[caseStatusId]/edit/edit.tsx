import React from 'react';
import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';
import EditCaseStatusForm from 'components/CaseStatus/EditCaseStatusForm/EditCaseStatusForm';
import AnnouncementMessage from 'components/AnnouncementMessage/AnnouncementMessage';

const EditCaseStatus = (): React.ReactElement => {
  const router = useRouter();
  const personId = Number(router.query.id as string);
  const type = String(router.query.type as string);
  const caseStatusId = Number(router.query.caseStatusId as string);
  let action = String(router.query.action as string);
  const isScheduledCaseStatus = Number(router.query.isScheduledCaseStatus);
  const currentCaseStatusStartDate = String(
    router.query.currentCaseStatusStartDate
  );

  let prefilledFields;
  if (router.query.prefilledFields) {
    prefilledFields = JSON.parse(router.query.prefilledFields.toString());
  }
  if (prefilledFields && prefilledFields.action) {
    action = String(prefilledFields.action);
    action.charAt(0).toUpperCase();
  }

  let announcement;

  if (isScheduledCaseStatus) {
    announcement = (
      <AnnouncementMessage
        title="An update has already been scheduled for this status"
        content="Any changes you make here will overwrite the scheduled update"
      />
    );
  } else announcement = null;

  return (
    <>
      {announcement}
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
        />
      </PersonView>
    </>
  );

  function capitalize(str: string) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }
};

export default EditCaseStatus;
