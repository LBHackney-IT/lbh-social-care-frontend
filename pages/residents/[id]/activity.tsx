import { prettyCaseDate, prettyCaseTitle } from 'lib/formatters';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Case, Resident } from 'types';
import { useCases } from 'utils/api/cases';
import { isAuthorised } from 'utils/auth';
import { generateInternalLink } from 'utils/urls';
import Spinner from 'components/Spinner/Spinner';

interface Props {
  resident: Resident;
}

const ActivityPage = ({ resident }: Props): React.ReactElement => {
  let showMore = false;

  const { data, size, setSize } = useCases({
    mosaic_id: resident.id,
  });

  if (!data) {
    return <Spinner />;
  }

  let cases: Case[] = [];
  data?.map((page) => {
    showMore = page.nextCursor ? true : false;
    if (page.cases) cases = cases.concat(page?.cases);
  });

  const generateCaseLink = (c: Case): string => {
    if (c.formType === 'flexible-form')
      return `/people/${c.personId}/submissions/${c.recordId}`;
    if (c.caseFormUrl) return c.caseFormUrl;
    const intLink = generateInternalLink(c);

    return intLink || '';
  };

  return (
    <>
      <h1>Activity</h1>
      <table className="govuk-table lbh-table">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th scope="col" className="govuk-table__header">
              Date
            </th>
            <th scope="col" className="govuk-table__header">
              Action
            </th>
            <th scope="col" className="govuk-table__header">
              User
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {cases.map((c) => {
            const link = generateCaseLink(c);

            return (
              <tr className="govuk-table__row" key={c.recordId}>
                <td className="govuk-table__cell">{prettyCaseDate(c)}</td>
                <td className="govuk-table__cell">
                  {link ? (
                    <Link href={link}>{prettyCaseTitle(c)}</Link>
                  ) : (
                    prettyCaseTitle(c)
                  )}
                </td>
                <td className="govuk-table__cell">{c.officerEmail}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showMore && (
        <button
          onClick={() => setSize(size + 1)}
          style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex' }}
          className="govuk-button lbh-button"
        >
          Load more
        </button>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const user = isAuthorised(req);

  // redirect unauthorised users to login
  if (!user) {
    return {
      props: {},
      redirect: {
        destination: `/login`,
      },
    };
  }

  const resident = await getResident(Number(params?.id), user);

  // does the resident exist?
  if (!resident.id) {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  return {
    props: {
      resident,
    },
  };
};

export default ActivityPage;
