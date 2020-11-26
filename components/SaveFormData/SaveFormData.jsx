import Link from 'next/link';
import { getData } from 'utils/saveData';

export const SavedForms = () => {
  const windowGlobal = typeof window !== 'undefined' && window;

  const allSavedData = Object.fromEntries(
    Object.entries({ ...windowGlobal.localStorage }).filter(([key]) =>
      key.includes('form')
    )
  );
  const list = (
    <>
      <h2 className="govuk-fieldset__legend--m govuk-warning">
        Incomplete forms
      </h2>
      <li className="govuk-save-link-list">
        {Object.entries(allSavedData).map(([key]) => (
          <Link key={key} href={`${key}${getData(key).step}?continueForm=true`}>
            <a className="govuk-breadcrumbs__link current">
              {key.replace(/(form)|(\/)/g, '')}
            </a>
          </Link>
        ))}
      </li>
    </>
  );

  return <div>{Object.keys(allSavedData).length ? list : null}</div>;
};
