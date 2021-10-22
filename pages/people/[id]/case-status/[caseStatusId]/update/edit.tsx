import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';
import UpdateCaseStatusForm from 'components/CaseStatus/UpdateCaseStatusForm/UpdateCaseStatusForm';
import AnnouncementMessage from 'components/AnnouncementMessage/AnnouncementMessage';

const EditCaseStatus = (): React.ReactElement => {
  const router = useRouter();
  const personId = Number(router.query.id as string);
  const type = String(router.query.type as string);
  const caseStatusId = Number(router.query.caseStatusId as string);
  const action = String(router.query.action);
  const isScheduledCaseStatus = Number(router.query.isScheduledCaseStatus);

  let prefilledFields;
  if (router.query.prefilledFields) {
    prefilledFields = JSON.parse(router.query.prefilledFields.toString());
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
        Update the child&lsquo;s circumstances
      </h1>
      <PersonView personId={personId} expandView>
        <UpdateCaseStatusForm
          caseStatusId={caseStatusId}
          personId={personId}
          prefilledFields={prefilledFields}
          action={action}
          caseStatusType={type}
        />
      </PersonView>
    </>
  );
};

export default EditCaseStatus;
