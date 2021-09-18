import React from 'react';
import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';
import ChooseEditCaseStatusForm from 'components/CaseStatus/EditCaseStatusForm/ChooseEditCaseStatusForm';

const EditEndCaseStatus = (): React.ReactElement => {
  const router = useRouter();
  const personId = Number(router.query.id as string);
  const caseStatusId = Number(router.query.caseStatusId as string);
  const prefilledValue = String(router.query.action as string);

  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Edit or end a case status
      </h1>
      <PersonView personId={personId} expandView>
        <ChooseEditCaseStatusForm
          personId={personId}
          caseStatusId={caseStatusId}
          prefilledValue={prefilledValue}
        />
      </PersonView>
    </>
  );
};

export default EditEndCaseStatus;
