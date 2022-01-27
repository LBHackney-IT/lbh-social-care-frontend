import CaseNoteGrid, {
  CaseNoteGridSkeleton,
} from 'components/ResidentPage/CaseNoteGrid';
import Layout from 'components/ResidentPage/Layout';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Case, Resident } from 'types';
import { useCases } from 'utils/api/cases';
import { isAuthorised } from 'utils/auth';

interface Props {
  resident: Resident;
}

const CaseNotesPage = ({ resident }: Props): React.ReactElement => {
  const { data, setSize, size, error } = useCases({
    mosaic_id: resident.id,
  });

  const initiallyLoading = !data && !error;

  let cases: Case[] = [];
  data?.map((page) => {
    if (page.cases) cases = cases.concat(page?.cases);
  });

  return (
    <Layout resident={resident}>
      <>
        {initiallyLoading && <CaseNoteGridSkeleton />}

        {cases?.length > 0 && (
          <>
            <CaseNoteGrid cases={cases} />

            <button
              onClick={() => setSize(size + 1)}
              className="govuk-button lbh-button"
            >
              Load more
            </button>
          </>
        )}
      </>
    </Layout>
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

export default CaseNotesPage;
