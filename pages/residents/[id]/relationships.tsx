import Layout from 'components/ResidentPage/Layout';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { isAuthorised } from 'utils/auth';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useRelationships } from 'utils/api/relationships';
import RelationshipsTable from 'components/ResidentPage/RelationshipsTable';
import { SummaryListSkeleton } from 'components/ResidentPage/SummaryList';

interface Props {
  resident: Resident;
}

const RelationshipsPage = ({ resident }: Props): React.ReactElement => {
  const { data, error } = useRelationships(resident.id);

  const relationshipsToShow =
    data?.personalRelationships && data.personalRelationships.length > 0;

  return (
    <Layout resident={resident} title="Case notes">
      <>
        {!data && !error ? (
          <SummaryListSkeleton />
        ) : relationshipsToShow ? (
          <RelationshipsTable relationships={data} />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <p className="lbh-body">This resident has no relationships yet.</p>
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
