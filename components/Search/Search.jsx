import { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SearchResidentsForm from './forms/SearchResidentsForm';
import SearchCasesForm from './forms/SearchCasesForm';
import ResidentsTable from './results/ResidentsTable';
import CasesTable from 'components/Cases/CasesTable';

import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAuth } from 'components/UserContext/UserContext';

import { useResidents } from 'utils/api/residents';
import { useCases } from 'utils/api/cases';
import { getQueryString } from 'utils/urls';

const getRecords = (data) => [
  ...(data.residents || []),
  ...(data?.cases || []),
];

const Search = ({
  type,
  subHeader,
  resultHeader,
  columns,
  showOnlyMyResults = false,
  ctaText = 'Search',
}) => {
  const { query, pathname, replace } = useRouter();
  const { user } = useAuth();
  const { SearchForm, SearchResults, useSearch } = useMemo(
    () =>
      type === 'records'
        ? {
            SearchForm: SearchCasesForm,
            SearchResults: CasesTable,
            useSearch: (
              { my_notes_only, worker_email, ...formData },
              ...args
            ) =>
              useCases(
                {
                  ...formData,
                  worker_email:
                    showOnlyMyResults || my_notes_only
                      ? user.email
                      : worker_email,
                },
                ...args
              ),
          }
        : {
            SearchForm: SearchResidentsForm,
            SearchResults: ResidentsTable,
            useSearch: useResidents,
          },
    [type, showOnlyMyResults, user.email]
  );
  const hasQuery = Boolean(Object.keys(query).length);
  const { data, error, size, setSize } = useSearch(
    query,
    hasQuery || showOnlyMyResults
  );
  const results = data && {
    records: data.reduce((acc, d) => [...acc, ...getRecords(d)], []),
    nextCursor: data[data.length - 1].nextCursor,
  };
  const onFormSubmit = useCallback(
    (formData) => {
      const qs = getQueryString({ ...query, ...formData });
      replace(`${pathname}?${qs}`, `${pathname}?${qs}`, {
        shallow: true,
        scroll: false,
      });
    },
    [pathname, query, replace]
  );

  // commented out as the feature is not ready in the BE
  // eslint-disable-next-line no-unused-vars
  const onSort = useCallback(
    (value) => {
      const { order_by, sort_by } = query || {};
      onFormSubmit({
        ...(query || {}),
        ...(sort_by === value && order_by === 'desc'
          ? { order_by: 'asc', sort_by }
          : { order_by: 'desc', sort_by: value }),
      });
    },
    [onFormSubmit, query]
  );
  const addNewPerson = type === 'people' &&
    (user.hasAdminPermissions || user.hasAdultPermissions) && (
      <>
        Results don&apos;t match?{' '}
        <Link href="/people/add">
          <a style={{ textDecoration: 'underline' }} className="govuk-link">
            {' '}
            Add New Person
          </a>
        </Link>
      </>
    );
  return (
    <>
      <p className="govuk-body govuk-!-margin-bottom-5">{subHeader}</p>
      <SearchForm
        onFormSubmit={onFormSubmit}
        defaultValues={query}
        user={user}
        showSearchByPerson={!showOnlyMyResults}
        ctaText={ctaText}
      />
      {results && (
        <>
          <div className="lbh-table-header">
            <h2 className="govuk-fieldset__legend--m govuk-custom-text-color">
              {resultHeader}
            </h2>
            <div style={{ textAlign: 'right' }}>{addNewPerson}</div>
          </div>
          <hr className="govuk-divider" />
          {results.records?.length > 0 ? (
            <SearchResults
              records={results.records}
              sort={query}
              columns={columns}
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
    </>
  );
};

Search.propTypes = {
  type: PropTypes.oneOf(['people', 'records']).isRequired,
  subHeader: PropTypes.string.isRequired,
  resultHeader: PropTypes.string.isRequired,
  showOnlyMyResults: PropTypes.bool,
  columns: PropTypes.array,
  ctaText: PropTypes.string,
};

export default Search;
