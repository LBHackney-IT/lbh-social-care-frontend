import { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SearchResidentsForm from './forms/SearchResidentsForm';
import SearchCasesForm from './forms/SearchCasesForm';
import ResidentsTable from './results/ResidentsTable';
import CasesTable from './results/CasesTable';

import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAuth } from 'components/UserContext/UserContext';

import { getResidents } from 'utils/api/residents';
import { getCases } from 'utils/api/cases';
import { getQueryString } from 'utils/urls';

const getRecords = (data) => [
  ...(data.residents || []),
  ...(data?.cases || []),
];

const Search = ({ type }) => {
  const { query, pathname, replace } = useRouter();
  const { user } = useAuth();
  const { SearchForm, SearchResults, searchFunction } = useMemo(
    () =>
      type === 'records'
        ? {
            SearchForm: SearchCasesForm,
            SearchResults: CasesTable,
            searchFunction: ({ my_notes_only, ...formData }, ...args) =>
              getCases(
                {
                  ...formData,
                  worker_email: my_notes_only ? user.email : '',
                },
                ...args
              ),
          }
        : {
            SearchForm: SearchResidentsForm,
            SearchResults: ResidentsTable,
            searchFunction: getResidents,
          },
    []
  );
  const hasQuery = Boolean(Object.keys(query).length);
  const { data, error, size, setSize } = searchFunction(query, hasQuery);
  const results = data && {
    records: data.reduce((acc, d) => [...acc, ...getRecords(d)], []),
    nextCursor: data[data.length - 1].nextCursor,
  };
  const onFormSubmit = useCallback((formData) => {
    const qs = getQueryString({ ...query, ...formData });
    replace(`${pathname}?${qs}`, `${pathname}?${qs}`, {
      shallow: true,
    });
  });
  // commented out as the feature is not ready in the BE
  // eslint-disable-next-line no-unused-vars
  const onSort = useCallback((value) => {
    const { order_by, sort_by } = query || {};
    onFormSubmit({
      ...(query || {}),
      ...(sort_by === value && order_by === 'desc'
        ? { order_by: 'asc', sort_by }
        : { order_by: 'desc', sort_by: value }),
    });
  });
  const addNewPerson = type === 'people' && user.hasAdminPermissions && (
    <>
      Results don't match?{' '}
      <Link href="/form/create-new-person/client-details">
        <a style={{ textDecoration: 'underline' }} className="govuk-link">
          {' '}
          Add New Person
        </a>
      </Link>
    </>
  );
  return (
    <>
      <h1 className="govuk-heading-l">Search</h1>
      <p className="govuk-body govuk-!-margin-bottom-5">
        Use search to find a person before adding a new person or record.
        Records will need to be linked to person.
      </p>
      <div className="govuk-tabs">
        <h2 className="govuk-tabs__title">Contents</h2>
        <ul className="govuk-tabs__list">
          <li
            className={cx('govuk-tabs__list-item', {
              'govuk-tabs__list-item--selected': type !== 'records',
            })}
          >
            <Link href="/" scroll={false}>
              <a className="govuk-tabs__tab">Search for a person</a>
            </Link>
          </li>
          <li
            className={cx('govuk-tabs__list-item', {
              'govuk-tabs__list-item--selected': type === 'records',
            })}
          >
            <Link href="/cases" scroll={false}>
              <a className="govuk-tabs__tab">Search for records by person</a>
            </Link>
          </li>
        </ul>
        <div className="govuk-tabs__panel">
          <p className="govuk-body govuk-!-margin-bottom-5">
            {type === 'records'
              ? 'Search and filter by any combination of fields'
              : 'Search for a person by any combination of fields below'}
          </p>
          <SearchForm
            onFormSubmit={onFormSubmit}
            defaultValues={query}
            user={user}
          />
          {results && (
            <>
              <div className="lbh-table-header">
                <h2 className="govuk-fieldset__legend--m govuk-custom-text-color">
                  {type.toUpperCase()} SEARCH RESULT
                </h2>
                <div style={{ textAlign: 'right' }}>{addNewPerson}</div>
              </div>
              <hr className="govuk-divider" />
              {results.records?.length > 0 ? (
                <SearchResults
                  records={results.records}
                  sort={query}
                  // onSort={onSort} // commented out as the feature is not ready in the BE
                />
              ) : (
                <>
                  <p className="govuk-body govuk-!-margin-top-5">
                    {type.charAt(0).toUpperCase() + type.slice(1)} not found
                  </p>
                </>
              )}
            </>
          )}
          <div style={{ height: '50px', textAlign: 'center' }}>
            {(hasQuery && !data) || size > data?.length ? (
              <Spinner />
            ) : (
              results?.nextCursor && (
                <Button label="load more" onClick={() => setSize(size + 1)} />
              )
            )}
          </div>
          {error && <ErrorMessage />}
        </div>
      </div>
    </>
  );
};

Search.propTypes = {
  type: PropTypes.oneOf(['people', 'records']).isRequired,
};

export default Search;
