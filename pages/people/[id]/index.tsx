import { useState } from 'react';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { CaseData, Resident } from 'types';
import Head from 'next/head';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/router';
import { useCasesByResident } from 'utils/api/cases';
import { useAllocatedWorkers } from 'utils/api/allocatedWorkers';
import { Case } from 'types';
import useSearch from 'hooks/useSearch';

interface Props {
  person: Resident;
}

interface NavLinkProps {
  href: string;
  children: React.ReactChild;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const router = useRouter();
  return (
    <li>
      <Link href={href}>
        <a
          className={`lbh-link lbh-link--no-visited-state ${
            router.pathname === href && `lbh-link--active`
          }`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

const PersonPage = ({ person }: Props): React.ReactElement => {
  const {
    data: casesData,
    size,
    setSize,
    error: casesError,
  } = useCasesByResident(person.id);
  const { data: allocations, error: allocationError } = useAllocatedWorkers(
    person.id
  );

  const [filter, setFilter] = useState<'all' | 'major'>('all');

  // flatten pagination
  const events = casesData
    ?.reduce((acc, page) => acc.concat(page.cases as Case[]), [] as Case[])
    .filter((event) =>
      filter === 'major' ? event.formName !== 'Child Case Note' : true
    );

  const [searchQuery, setSearchQuery] = useState<string>('');
  const results = useSearch(searchQuery, events, [
    'formName',
    'officerEmail',
    'caseFormData',
  ]);

  const navigation = {
    Timeline: `/people/${person.id}`,
    Relationships: `/people/${person.id}/relationships`,
    'Attachments and files': `/people/${person.id}/files`,
    Details: `/people/${person.id}/details`,
  };

  console.log(allocations);

  return (
    <>
      <Head>
        <title>
          {person.firstName} {person.lastName} | Social care | Hackney Council
        </title>
      </Head>

      {filter}

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1">
            {person.firstName} {person.lastName}
          </h1>
          <p className="govuk-caption-m govuk-!-margin-top-3 govuk-!-margin-bottom-8">
            #{person.id}
            {person.dateOfBirth &&
              ` · Born ${format(new Date(person.dateOfBirth), 'dd MMM yyyy')}`}
          </p>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-quarter">
          <nav>
            <ul className="lbh-list">
              {Object.entries(navigation).map(([label, url]) => (
                <NavLink href={url} key={url}>
                  {label}
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>
        <div className="govuk-grid-column-three-quarters">
          <Link href={`/people/${person.id}/records`}>
            <a className="govuk-button lbh-button">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                <path d="M6.94 0L5 0V12H6.94V0Z" />
                <path d="M12 5H0V7H12V5Z" />
              </svg>
              Add case note
            </a>
          </Link>
          <Link href={`/people/${person.id}/records`}>
            <a className="govuk-button lbh-button lbh-button--secondary">
              Add something else
            </a>
          </Link>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              {events?.length > 0 && (
                <ol className="lbh-timeline">
                  {results?.map((event) => (
                    <li
                      className={`lbh-timeline__event ${
                        event.formName === 'Child Case Note' &&
                        `lbh-timeline__event--minor`
                      }`}
                      key={event.recordId}
                    >
                      <h3 className="lbh-heading-h3">{event.formName}</h3>
                      <p className="lbh-body">
                        {event.dateOfEvent &&
                          format(
                            new Date(String(event.dateOfEvent)),
                            'dd MMM yyyy'
                          )}
                      </p>
                      <p className="lbh-body">{event.officerEmail}</p>
                    </li>
                  ))}
                </ol>
              )}

              <button
                className="govuk-button lbh-button lbh-button--secondary"
                onClick={() => setSize(size + 1)}
              >
                Load older events
              </button>
            </div>
            <div className="govuk-grid-column-one-third">
              <p className="lbh-body-xs">
                Showing {events?.length} events over{' '}
                {events?.length > 0 &&
                  formatDistanceToNow(
                    new Date(events?.[events.length - 1]?.caseFormTimestamp)
                  )}
              </p>

              <div className="govuk-form-group lbh-form-group">
                <label
                  className="govuk-label lbh-label govuk-visually-hidden"
                  htmlFor="query"
                >
                  Search for matching records
                </label>
                <div className="lbh-search-box" style={{ marginTop: 0 }}>
                  <input
                    className="govuk-input lbh-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="query"
                    name="query"
                    type="search"
                    placeholder="eg. 123456"
                  />
                  <button className="lbh-search-box__action">
                    <span className="govuk-visually-hidden">Search</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.6999 10.6C12.0747 10.6 13.9999 8.67482 13.9999 6.3C13.9999 3.92518 12.0747 2 9.6999 2C7.32508 2 5.3999 3.92518 5.3999 6.3C5.3999 8.67482 7.32508 10.6 9.6999 10.6ZM9.6999 12.6C13.1793 12.6 15.9999 9.77939 15.9999 6.3C15.9999 2.82061 13.1793 0 9.6999 0C6.22051 0 3.3999 2.82061 3.3999 6.3C3.3999 9.77939 6.22051 12.6 9.6999 12.6Z"
                        fill="#0B0C0C"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.70706 10.7071L1.70706 15.7071L0.292847 14.2929L5.29285 9.29289L6.70706 10.7071Z"
                        fill="#0B0C0C"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="govuk-radios govuk-radios--small lbh-radios">
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="filter-all"
                    name="filter"
                    type="radio"
                    value="all"
                    checked={filter === 'all'}
                    onChange={() => setFilter('all')}
                  />
                  <label
                    className="govuk-radios__label lbh-body-s"
                    htmlFor="filter-all"
                  >
                    All events
                  </label>
                </div>
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="filter-major"
                    name="filter"
                    type="radio"
                    value="major"
                    checked={filter === 'major'}
                    onChange={() => setFilter('major')}
                  />
                  <label
                    className="govuk-radios__label lbh-body-s"
                    htmlFor="filter-major"
                  >
                    Major events only
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PersonPage.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const person = await getResident(Number(params?.id));

  if (!person.id) {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  return {
    props: {
      person,
    },
  };
};

export default PersonPage;
