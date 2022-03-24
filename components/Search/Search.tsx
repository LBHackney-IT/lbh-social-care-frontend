import { useMemo, useCallback, ReactElement } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import s from './Search.module.scss';
import ss from 'stylesheets/Section.module.scss';
import cx from 'classnames';
import SearchResidentsForm from './forms/SearchResidentsForm';
import SearchCasesForm from './forms/SearchCasesForm';
import ResidentsTable from './results/ResidentsTable';
import RelationshipTable from './results//RelationshipTable';
import CasesTable, { CaseTableColumns } from 'components/Cases/CasesTable';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAuth } from 'components/UserContext/UserContext';
import { SearchPerson } from 'utils/api/search';
import { useCases } from 'utils/api/cases';
import { getQueryString } from 'utils/urls';

const getRecords = (data: { [key: string]: Array<unknown> }) => [
  ...(data.residents || []),
  ...(data?.cases || []),
];

interface SearchInput {
  type: 'people' | 'records' | 'relationship';
  subHeader: ReactElement;
  resultHeader: string;
  columns?: CaseTableColumns[];
  showOnlyMyResults?: boolean;
  ctaText?: string;
  callback?: (value: any) => void | null;
}

const Search = ({
  type,
  subHeader,
  resultHeader,
  columns,
  showOnlyMyResults = false,
  ctaText = 'Search',
  callback,
}: SearchInput) => {
  const { query, pathname, replace } = useRouter();
  const { user } = useAuth();

  const { SearchForm, SearchResults, useSearch } = useMemo<{
    SearchForm: any;
    SearchResults: any;
    useSearch: any;
  }>((): {
    SearchForm: any;
    SearchResults: any;
    useSearch: any;
  } => {
    switch (type) {
      case 'records':
        return {
          SearchForm: SearchCasesForm,
          SearchResults: CasesTable,
          useSearch: (
            { my_notes_only, worker_email, ...formData }: any,
            ...args: any
          ) =>
            useCases(
              {
                ...formData,
                worker_email:
                  showOnlyMyResults || my_notes_only
                    ? user?.email
                    : worker_email,
              },
              ...args
            ),
        };
      case 'people':
        return {
          SearchForm: SearchResidentsForm,
          SearchResults: ResidentsTable,
          useSearch: SearchPerson,
        };
      case 'relationship':
        return {
          SearchForm: SearchResidentsForm,
          SearchResults: RelationshipTable,
          useSearch: SearchPerson,
        };
    }
  }, [type, showOnlyMyResults, user?.email]);

  let hasQuery = Boolean(Object.keys(query).length);

  //this is to prevent a search if the parameter "ID" comes from the URL (not as a parameter)
  //example: people/43/relationships/add, will ignore the "43"
  //this way the search will be clear and not filled with results
  // console.log(JSON.stringify(query));
  if (Object.keys(query).length == 1 && query.id) {
    hasQuery = false;
  }

  const { data, error, size, setSize } = useSearch(
    query,
    hasQuery || showOnlyMyResults
  );
  const results = data &&
    data !== 1 && {
      records: data?.reduce(
        (acc: any, d: any) => [...acc, ...getRecords(d)],
        []
      ),
      nextCursor: data[data.length - 1].nextCursor,
    };

  const onFormSubmit = useCallback(
    (formData) => {
      const qs = formData
        ? `?${getQueryString({ ...query, ...formData })}`
        : '';
      replace(
        `${pathname.replace('[id]', query.id as string)}${qs}`,
        `${pathname.replace('[id]', query.id as string)}${qs}`,
        {
          shallow: true,
          scroll: false,
        }
      );
    },
    [pathname, query, replace]
  );

  return (
    <>
      <p className="govuk-body govuk-!-margin-top-5 govuk-!-margin-bottom-5">
        {subHeader}
      </p>
      <SearchForm
        onFormSubmit={onFormSubmit}
        defaultValues={query}
        user={user}
        showSearchByPerson={!showOnlyMyResults}
        ctaText={ctaText}
      />
      {results && (
        <>
          <div className={`${ss.heading} govuk-!-margin-top-8`}>
            <h2>{resultHeader}</h2>
          </div>

          {results.records?.length > 0 ? (
            <SearchResults
              records={results.records}
              sort={query}
              callback={callback}
              columns={columns}
              user={user}
            />
          ) : (
            <>
              <p className="lbh-body">
                No {type.charAt(0) + type.slice(1)} match your criteria.
              </p>
            </>
          )}
        </>
      )}
      <div className={s.actions}>
        {(hasQuery && !data) || size > data?.length ? (
          <Spinner />
        ) : (
          results?.nextCursor && (
            <Button label="Load more" onClick={() => setSize(size + 1)} />
          )
        )}
      </div>
      {error && data !== 1 && <ErrorMessage />}

      {type === 'people' &&
        results &&
        (!results?.nextCursor || parseInt(results?.nextCursor) > 39) && (
          <>
            {results?.records?.length > 0 ? (
              <>
                <p>Can&apos;t find a match?</p>
                <p>
                  Try narrowing your search, or{' '}
                  <Link href={`/people/add?${getQueryString(query)}`}>
                    <a className="lbh-link lbh-link--no-visited-state">
                      add a new person
                    </a>
                  </Link>
                  .
                </p>
              </>
            ) : (
              <p>
                Try widening your search, or{' '}
                <Link href={`/people/add?${getQueryString(query)}`}>
                  <a className="lbh-link lbh-link--no-visited-state">
                    add a new person
                  </a>
                </Link>
                .
              </p>
            )}

            <div className={s.mutedPanel}>
              <div
                className={cx(
                  'govuk-warning-text lbh-warning-text',
                  s.warningText
                )}
              >
                <span
                  className={cx('govuk-warning-text__icon', s.icon)}
                  aria-hidden="true"
                >
                  !
                </span>
                <strong className={cx('govuk-warning-text__text', s.text)}>
                  <h2>Prevent duplicate people</h2>
                  <p>Before adding a new person, try:</p>
                  <ul className="lbh-list lbh-list--bullet">
                    <li>alternate spellings or variations of the same name</li>
                    <li>
                      different combinations of names, date of birth or postcode
                    </li>
                    <li>using just the first part of the postcode</li>
                  </ul>
                </strong>
              </div>
            </div>
          </>
        )}
    </>
  );
};

Search.propTypes = {
  type: PropTypes.oneOf(['people', 'records', 'relationship']).isRequired,
  subHeader: PropTypes.element.isRequired,
  resultHeader: PropTypes.string.isRequired,
  showOnlyMyResults: PropTypes.bool,
  columns: PropTypes.array,
  ctaText: PropTypes.string,
  callback: PropTypes.func,
};

export default Search;
