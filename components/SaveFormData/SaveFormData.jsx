import { useState, useEffect } from 'react';

import { getDataIncludes, deleteData } from 'utils/saveData';
import { DetailedTable, StandardTable } from './Tables';

export const SavedForms = () => {
  const [savedForms, setSavedForms] = useState();
  useEffect(() => {
    setSavedForms(getDataIncludes('/form'));
  }, []);
  const deleteForm = (path) => {
    deleteData(path);
    setSavedForms(getDataIncludes('/form'));
  };
  if (!savedForms) {
    return (
      <p className="govuk-fieldset__legend--m gov-weight-lighter">
        You don't have any incomplete form, well done!
      </p>
    );
  }
  const detailHeader = [
    'Person ID',
    'Client Name',
    'Date of birth',
    'Form type',
    'Last saved',
    'Actions',
    '',
  ];
  const standardHeader = ['Form type', 'Last saved', 'Actions', ''];
  const sortData = Object.values(savedForms);
  const formQty = sortData.length;
  const detailData = sortData.filter((item) => item.includesDetails);
  const standardData = sortData.filter((item) => !item.includesDetails);
  console.log(sortData);
  return (
    <>
      <p className="govuk-fieldset__legend--s gov-weight-lighter">
        {`Displaying ${formQty} unfinished ${formQty > 1 ? 'forms' : 'form'}`}{' '}
      </p>
      {standardData.length ? (
        <StandardTable
          tableHeader={standardHeader}
          data={standardData}
          deleteForm={deleteForm}
        />
      ) : null}
      {detailData.length ? (
        <DetailedTable
          tableHeader={detailHeader}
          data={detailData}
          deleteForm={deleteForm}
        />
      ) : null}
    </>
  );
};
