import { prettyCaseDate, prettyCaseTitle } from 'lib/formatters';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Case, Resident } from 'types';
import { useCases } from 'utils/api/cases';
import { isAuthorised } from 'utils/auth';

interface Props {
  resident: Resident;
}

const ActivityPage = ({ resident }: Props): React.ReactElement => {
  const { data, size, setSize } = useCases({
    mosaic_id: resident.id,
  });

  let cases: Case[] = [];
  data?.map((page) => {
    if (page.cases) cases = cases.concat(page?.cases);
  });

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
          {cases.map((c) => (
            <tr className="govuk-table__row" key={c.recordId}>
              <td className="govuk-table__cell">{prettyCaseDate(c)}</td>
              <td className="govuk-table__cell">{prettyCaseTitle(c)}</td>
              <td className="govuk-table__cell">{c.officerEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setSize(size + 1)}
        className="govuk-button lbh-button"
      >
        Load more
      </button>
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
