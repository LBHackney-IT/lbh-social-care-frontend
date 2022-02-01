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
import { formatDate } from 'utils/date';

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
        socialCareId={resident.id}
        list={[
          {
            label: 'Social care ID',
            name: 'id',
          },
          {
            label: 'Title',
            name: 'title',
            showInSummary: true,
            options: [
              { label: 'Mr', value: 'Mr' },
              { label: 'Mrs', value: 'Mrs' },
              { label: 'Miss', value: 'Miss' },
              { label: 'Ms', value: 'Ms' },
              { label: 'Dr', value: 'Dr' },
              { label: 'Mx', value: 'Mx' },
            ],
          },
          {
            label: 'First name',
            name: 'firstName',
          },
          { label: 'Last name', name: 'lastName' },
          {
            label: 'Email address',
            name: 'emailAddress',
            showInSummary: true,
            type: 'email',
          },

          {
            label: 'Date of birth',
            name: 'dateOfBirth',
            beforeDisplay: (val) => formatDate(val as string) || '',
            beforeEdit: (val) => {
              console.log(val);
              // const date =
            },
            beforeSave: (val) => val,
            type: 'date',
          },
          {
            label: 'Restricted?',
            showInSummary: true,
            beforeDisplay: (val) => (val === 'Y' ? 'Yes' : 'No'),
            name: 'restricted',
            options: [
              {
                label: 'Yes',
                value: 'Y',
              },
              {
                label: 'No',
                value: 'N',
              },
            ],
          },
        ]}
      />

      <DataBlock
        title="Medical needs"
        socialCareId={resident.id}
        list={[
          {
            label: 'NHS number',
            name: 'nhsNumber',
            showInSummary: true,
            beforeSave: (val) => parseInt(val as string),
          },
          // TODO: add more fields when we support them
        ]}
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

      <Collapsible
        title="Workflows"
        link={
          <Link href={`/residents/${resident.id}/workflows`}>
            <a className="lbh-link lbh-link--muted">See all</a>
          </Link>
        }
      >
        test
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
