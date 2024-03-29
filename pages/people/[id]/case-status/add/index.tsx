import React from 'react';
import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';
import AddCaseStatusForm from 'components/CaseStatus/AddCaseStatusForm/AddCaseStatusForm';

const AddNewCaseStatus = (): React.ReactElement => {
  const router = useRouter();
  const personId = Number(router.query.id as string);

  let prefilledFields;
  if (router.query.prefilledFields) {
    prefilledFields = JSON.parse(router.query.prefilledFields.toString());
  }

  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add a case status
      </h1>
      <PersonView personId={personId} expandView>
        <AddCaseStatusForm
          personId={personId}
          prefilledFields={prefilledFields}
        />
      </PersonView>
    </>
  );
};

export default AddNewCaseStatus;
