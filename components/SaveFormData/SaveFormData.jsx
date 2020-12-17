import { useState, useEffect } from 'react';
import Link from 'next/link';

import { getDataIncludes, deleteData } from 'utils/saveData';

export const SavedForms = () => {
  const [savedForms, setSavedForms] = useState();
  useEffect(() => {
    setSavedForms(getDataIncludes('/form'));
  }, []);
  if (!savedForms) {
    return (
      <p className="govuk-fieldset__legend--m gov-weight-lighter">
        You don't have any incomplete form, well done!
      </p>
    );
  }

  const tableHeader = [
    { id: 'person_id', text: 'Person ID' },
    { id: 'client_name', text: 'Client Name' },
    { id: 'date_of_birth', text: 'Date of birth' },
    { id: 'form_type', text: 'Form type' },
    { id: 'last_saved', text: 'Last saved' },
    { id: 'complete', text: 'Complete' },
    { id: 'delete', text: 'Delete' },
  ];
  console.log(Object.keys(savedForms));

  const handleDeleteData = (formPath) => {
    deleteData(formPath);
  };
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
          {/* {records.map((result) => (
            <CasesEntry key={result.personId} {...result} />
          ))} */}
        </tbody>
      </table>
      <ul className="govuk-list">
        {Object.entries(savedForms).map(([key, value]) => (
          <li>
            <Link key={key} href={`${key}${value.step}?continueForm=true`}>
              <a className="govuk-link">{key.replace(/(form)|(\/)/g, '')}</a>
            </Link>
            <button onClick={handleDeleteData}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};
