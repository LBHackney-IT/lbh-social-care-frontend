import { useState, useEffect } from 'react';

import { getData, deleteData, SavedData } from 'utils/saveData';
import SavedDataTable from './SavedDataTable';

export const SavedForms = (): React.ReactElement | null => {
  const [savedForms, setSavedForms] = useState<Record<string, SavedData>>();
  useEffect(() => {
    setSavedForms(getData());
  }, []);
  const deleteForm = (path: string) => {
    deleteData(path);
    setSavedForms(getData());
  };

  if (!savedForms || Object.keys(savedForms)?.length === 0) return null;

  const detailHeader = ['Person ID', 'Client Name', 'Date of birth'];
  const standardHeader = ['Form type', 'Last saved', 'Actions', ''];
  const sortData = Object.values(savedForms);
  const detailData = sortData.filter((item) => Boolean(item.personDetails));
  const standardData = sortData.filter((item) => !item.personDetails);
  return (
    <>
      <h3>Forms saved to this browser</h3>
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

export default SavedForms;
