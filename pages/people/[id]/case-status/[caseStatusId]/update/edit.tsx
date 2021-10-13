import React from 'react';
import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';
import UpdateCaseStatusForm from 'components/CaseStatus/UpdateCaseStatusForm/UpdateCaseStatusForm';

const EditCaseStatus = (): React.ReactElement => {
  const router = useRouter();
  const personId = Number(router.query.id as string);
  const type = String(router.query.type as string);
  const caseStatusId = Number(router.query.caseStatusId as string);
  const action = String(router.query.action);

  let prefilledFields;
  if (router.query.prefilledFields) {
    prefilledFields = JSON.parse(router.query.prefilledFields.toString());
  }

  return (
    <>
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
