import { useState, useEffect } from 'react';

import { getData, deleteData, SavedData } from 'utils/saveData';
import SavedDataTable from './SavedDataTable';

export const SavedForms = (): React.ReactElement => {
  const [savedForms, setSavedForms] = useState<Record<string, SavedData>>();
  useEffect(() => {
    setSavedForms(getData());
  }, []);
  const deleteForm = (path: string) => {
    deleteData(path);
    setSavedForms(getData());
  };
  if (!savedForms || Object.keys(savedForms)?.length === 0) {
    return (
      <p role="label" className="govuk-fieldset__legend--m gov-weight-lighter">
        You don&apos;t have any incomplete form, well done!
      </p>
    );
  }
  const detailHeader = ['Person ID', 'Client Name', 'Date of birth'];
  const standardHeader = ['Form type', 'Last saved', 'Actions', ''];
  const sortData = Object.values(savedForms);
  const formQty = sortData.length;
  const detailData = sortData.filter((item) => Boolean(item.personDetails));
  const standardData = sortData.filter((item) => !item.personDetails);
  return (
    <>
      <p role="label" className="govuk-fieldset__legend--s gov-weight-lighter">
        {`Displaying ${formQty} unfinished ${formQty > 1 ? 'forms' : 'form'}`}{' '}
      </p>
      {standardData.length > 0 && (
        <SavedDataTable
          tableHeader={standardHeader}
          savedData={standardData}
          deleteForm={deleteForm}
        />
      )}
      {detailData.length > 0 && (
        <SavedDataTable
          tableHeader={[...detailHeader, ...standardHeader]}
          savedData={detailData}
          deleteForm={deleteForm}
        />
      )}
    </>
  );
};
