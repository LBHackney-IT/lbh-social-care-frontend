import CaseNoteGrid from 'components/ResidentPage/CaseNoteGrid';
import Collapsible from 'components/ResidentPage/Collapsible';
import DataBlock from 'components/ResidentPage/DataBlock';
import Layout from 'components/ResidentPage/Layout';
import Mapping from 'components/ResidentPage/Mapping';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { useCases } from 'utils/api/cases';
import { isAuthorised } from 'utils/auth';
import Link from 'next/link';

interface Props {
  resident: Resident;
}

const ResidentPage = ({ resident }: Props): React.ReactElement => {
  const { data } = useCases({
    mosaic_id: resident.id,
  });

  const cases = data?.[0].cases.slice(0, 3); // only the first three cases

  return (
    <Layout resident={resident}>
      <DataBlock
        title="Personal details"
        list={resident}
        socialCareId={resident.id.toString()}
      />

      <Collapsible
        title="Case notes & records"
        link={
          <Link href={`/residents/${resident.id}/case-notes`}>
            <a className="lbh-link lbh-link--muted">See all</a>
          </Link>
        }
      >
        <>{cases && <CaseNoteGrid cases={cases} />}</>
      </Collapsible>

      <Collapsible title="Housing">
        <Mapping resident={resident} />
      </Collapsible>
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

export default ResidentPage;
