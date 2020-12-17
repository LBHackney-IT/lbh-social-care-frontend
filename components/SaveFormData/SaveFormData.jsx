import { useState, useEffect } from 'react';
import Link from 'next/link';

import { getDataIncludes, deleteData } from 'utils/saveData';
import DeleteIcon from './DeleteIcon';

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
  const tableHeader = [
    { id: 'form_type', text: 'Form type' },
    { id: 'last_saved', text: 'Last saved' },
    { id: 'action', text: 'Action' },
  ];
  const formQty = Object.entries(savedForms).length;
  return (
    <>
      <p className="govuk-fieldset__legend--s gov-weight-lighter">
        {`Displaying ${formQty} unfinished ${formQty > 1 ? 'forms' : 'form'}`}{' '}
      </p>
      <table className="govuk-table">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            {tableHeader.map(({ id, text }) => (
              <th key={id} className="govuk-table__header">
                {text}
              </th>
            ))}
            <th scope="col" className="govuk-table__header"></th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {Object.entries(savedForms).map(([key, value]) => (
            <tr key={key} className="govuk-table__row">
              <td className="govuk-table__cell">{value.title} </td>
              <td className="govuk-table__cell"> {value.timeStamp}</td>
              <td className="govuk-table__cell">
                {
                  <Link
                    href={`${value.formPath}${value.step}&continueForm=true`}
                  >
                    <a className="govuk-link">Complete</a>
                  </Link>
                }
              </td>
              <td className="govuk-table__cell" onClick={() => deleteForm(key)}>
                <DeleteIcon update={setSavedForms} value={key} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
