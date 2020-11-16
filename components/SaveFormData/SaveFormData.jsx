import Link from 'next/link';
import { getData } from 'utils/saveData';

export const SavedForms = () => {
  const windowGlobal = typeof window !== 'undefined' && window;
  const data = Object.fromEntries(
    Object.entries({ ...windowGlobal.localStorage }).filter(([key]) =>
      key.includes('form')
    )
  );

  return (
    <>
      <h3 className="govuk-fieldset__legend--m govuk-warning">
        {' '}
        {Object.keys(data).length ? 'Incomplete forms' : null}{' '}
      </h3>
      <li>
        {Object.entries(data).map(([key]) => (
          <Link key={key} href={`${key}${getData(key).step}`}>
            <a className="govuk-breadcrumbs__link current">
              {key.replace(/(form)|(\/)/g, '')}
            </a>
          </Link>
        ))}
      </li>
    </>
  );
};
