import React from 'react';
import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';
import EditCaseStatusForm from 'components/CaseStatus/EditCaseStatusForm/EditCaseStatusForm';

const EditCaseStatus = (): React.ReactElement => {
  const router = useRouter();
  const personId = Number(router.query.id as string);
  const action = String(router.query.action as string);
  const type = String(router.query.type as string);
  const caseStatusId = Number(router.query.caseStatusId as string);

  let prefilledFields;
  if (router.query.prefilledFields) {
    prefilledFields = JSON.parse(router.query.prefilledFields.toString());
  }

  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Edit a case status
      </h1>
      <PersonView personId={personId} expandView>
        <EditCaseStatusForm
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
