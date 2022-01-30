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
      {JSON.stringify(Object.keys(resident))}

      <DataBlock
        title="Personal details"
        resident={resident}
        list={[
          {
            displayLabel: 'Social care ID',
            displayValue: resident.id,
            editableName: 'id',
            editableValue: resident.id,
          },
          {
            displayLabel: 'Title',
            displayValue: resident.title || '',
            editableName: 'title',
            editableValue: resident.title || '',
          },
          {
            displayLabel: 'First name',
            displayValue: resident.firstName,
            editableName: 'firstName',
            editableValue: resident.firstName,
          },
          {
            displayLabel: 'Last name',
            displayValue: resident.lastName,
            editableName: 'lastName',
            editableValue: resident.lastName,
          },
          {
            displayLabel: 'Email address',
            displayValue: resident.emailAddress || '',
            editableName: 'emailAddress',
            editableValue: resident.emailAddress || '',
            highlight: true,
          },
          {
            displayLabel: 'Date of birth',
            displayValue: formatDate(resident.dateOfBirth || '') || '',
            editableName: 'dateOfBirth',
            editableValue: resident.dateOfBirth || '',
            highlight: true,
          },
        ]}
      />

      <DataBlock
        title="Medical needs"
        resident={resident}
        list={[
          {
            displayLabel: 'NHS number',
            displayValue: resident.nhsNumber || '',
            editableName: 'nhsNumber',
            editableValue: resident.nhsNumber || '',
            highlight: true,
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
      ></Collapsible>

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
