import { useState, useEffect } from 'react';
import Link from 'next/link';

import { getDataIncludes } from 'utils/saveData';

export const SavedForms = () => {
  const [savedForms, setSavedForms] = useState();
  useEffect(() => {
    setSavedForms(getDataIncludes('/form'));
  }, []);
  if (!savedForms) {
    return <div>You don't have any incomplete form, well done!</div>;
  }
  return (
    <ul className="govuk-list">
      {Object.entries(savedForms).map(([key, value]) => (
        <li>
          <Link key={key} href={`${key}${value.step}?continueForm=true`}>
            <a className="govuk-link">{key.replace(/(form)|(\/)/g, '')}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
