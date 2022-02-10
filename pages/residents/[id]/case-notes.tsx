import CaseNoteGrid, {
  CaseNoteGridSkeleton,
} from 'components/ResidentPage/CaseNoteGrid';
import Layout from 'components/ResidentPage/Layout';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Case, Resident } from 'types';
import { useCases } from 'utils/api/cases';
import { isAuthorised } from 'utils/auth';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

interface Props {
  resident: Resident;
}

const RelationshipsPage = ({ resident }: Props): React.ReactElement => {
  const { data, setSize, size, error } = useCases({
    mosaic_id: resident.id,
    exclude_audit_trail_events: true,
  });

  let cases: Case[] = [];
  data?.map((page) => {
    if (page.cases) cases = cases.concat(page?.cases);
  });

  const totalCount = data?.[0]?.totalCount || 0;
  const casesToShow = cases.length > 0;

  return (
    <Layout resident={resident} title="Case notes">
      <>
        {!data && !error ? (
          <CaseNoteGridSkeleton />
        ) : casesToShow ? (
          <CaseNoteGrid
            cases={cases}
            size={size}
            setSize={setSize}
            resident={resident}
            totalCount={totalCount}
          />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <p className="lbh-body">This resident has no case notes yet.</p>
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

export default RelationshipsPage;
