import { useState, useEffect } from 'react';

import { getData, deleteData, BasicData, DetailedData } from 'utils/saveData';
import { DetailedTable, StandardTable } from './Tables';

export const SavedForms = (): React.ReactElement => {
  const [savedForms, setSavedForms] = useState<
    Record<string, BasicData | DetailedData>
  >();
  useEffect(() => {
    setSavedForms(getData());
  }, []);
  const deleteForm = (path: string) => {
    deleteData(path);
    setSavedForms(getData());
  };
  if (!savedForms || Object.keys(savedForms)?.length === 0) {
    return <p className="lbh-body">You have no incomplete forms right now.</p>;
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
  const detailData = sortData.filter((item) =>
    Boolean(item.includesDetails)
  ) as DetailedData[];
  const standardData = sortData.filter((item) => !item.includesDetails);
  return (
    <>
      <p className="lbh-body">
        {`You have ${formQty} unfinished ${formQty > 1 ? 'forms' : 'form'}`}{' '}
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
