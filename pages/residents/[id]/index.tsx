import CaseNoteGrid from 'components/ResidentPage/CaseNoteGrid';
import Collapsible from 'components/ResidentPage/Collapsible';
import DataBlock from 'components/ResidentPage/DataBlock';
import Layout from 'components/ResidentPage/Layout';
import Mapping from 'components/ResidentPage/Mapping';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Address, OtherName, PhoneNumber, Resident } from 'types';
import { useCases } from 'utils/api/cases';
import { isAuthorised } from 'utils/auth';
import Link from 'next/link';
import { formatDate } from 'utils/date';
import SEXUAL_ORIENTATIONS from 'data/orientation';
import languages from 'data/languages';
import useWorkflows from 'hooks/useWorkflows';
import WorkflowOverview from 'components/ResidentPage/WorkflowOverview';

interface Props {
  resident: Resident;
}

const ResidentPage = ({ resident }: Props): React.ReactElement => {
  const { data: casesData } = useCases({
    mosaic_id: resident.id,
    exclude_audit_trail_events: true,
  });
  const { data: workflowsData } = useWorkflows(resident.id);

  const cases = casesData?.[0].cases.slice(0, 3); // only the first three cases
  const totalCount = casesData?.[0]?.totalCount || 0;
  const workflows = workflowsData?.workflows;

  return (
    <Layout resident={resident}>
      <DataBlock
        title="Personal details"
        socialCareId={resident.id}
        list={[
          {
            label: 'Social care ID',
            name: 'id',
            readOnly: true,
          },
          {
            label: 'Service area',
            name: 'contextFlag',
            beforeDisplay: (val) =>
              val === 'A' ? 'Adult social care' : "Children's social care",
            options: [
              { label: 'Adult social care', value: 'A' },
              { label: "Children's social care", value: 'C' },
            ],
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
            required: true,
          },
          { label: 'Last name', name: 'lastName', required: true },
          {
            label: 'Other names',
            name: 'otherNames',
            beforeDisplay: (val) => (val as OtherName[])?.[0]?.firstName,
            beforeEdit: (val) => (val as OtherName[])?.[0]?.firstName,
            beforeSave: (val) => [{ firstName: val, lastName: '' }],
          },
          {
            label: 'Date of birth',
            name: 'dateOfBirth',
            required: true,
            beforeDisplay: (val) => formatDate(val as string) || '',
            beforeEdit: (val) => (val as string)?.split('T')[0],
            type: 'date',
          },
          {
            label: 'Date of death',
            name: 'dateOfDeath',
            beforeDisplay: (val) => formatDate(val as string) || '',
            beforeEdit: (val) => (val as string)?.split('T')[0],
            type: 'date',
          },
          {
            label: 'First language',
            name: 'firstLanguage',
            options: [
              {
                value: '',
                label: 'Not known',
              },
            ].concat(
              languages.map((lang) => ({
                label: lang,
                value: lang,
              }))
            ),
          },
          {
            label: 'Gender',
            name: 'gender',
            options: [
              {
                value: '',
                label: 'Not known',
              },
              {
                value: 'F',
                label: 'Female',
              },
              {
                value: 'M',
                label: 'Male',
              },
              {
                value: 'Non-binary',
                label: 'Non-binary',
              },
              {
                value: 'Other',
                label: 'Other',
              },
              {
                value: 'Prefer not to say',
                label: 'Prefer not to say',
              },
            ],
            beforeDisplay: (val) => {
              if (val === 'F') return 'Female';
              if (val === 'M') return 'Male';
              return val as string;
            },
          },
          {
            label: 'Sexual orientation',
            name: 'sexualOrientation',
            options: [
              {
                value: '',
                label: 'Not known',
              },
            ].concat(
              SEXUAL_ORIENTATIONS.map((opt) => ({
                label: opt,
                value: opt,
              }))
            ),
          },
          {
            label: 'Email address',
            name: 'emailAddress',
            showInSummary: true,
            type: 'email',
            beforeDisplay: (val) => (
              <a
                className="lbh-link lbh-link--no-visited-state"
                href={`mailto:${val}`}
              >
                {val}
              </a>
            ),
          },
          {
            label: 'Phone numbers',
            name: 'phoneNumbers',
            beforeDisplay: (val) => (
              <ul className="lbh-list lbh-body-s">
                {(val as PhoneNumber[]).map((number, i) => (
                  <li key={i}>
                    <strong>{number.type}:</strong>{' '}
                    <a
                      className="lbh-link lbh-link--no-visited-state"
                      href={`tel:${number.number}`}
                    >
                      {number.number}
                    </a>
                  </li>
                ))}
              </ul>
            ),
          },

          {
            label: 'Contact preference',
            name: 'preferredMethodOfContact',
            showInSummary: true,
            options: [
              { label: '', value: '' },
              {
                label: 'Phone',
                value: 'Phone',
              },
              {
                label: 'Post/letter',
                value: 'Post/letter',
              },
              {
                label: 'Email',
                value: 'Email',
              },
              {
                label: 'Face to face',
                value: 'Face to face',
              },
            ],
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
        <>
          {cases && (
            <CaseNoteGrid
              cases={cases}
              resident={resident}
              totalCount={totalCount}
            />
          )}
        </>
      </Collapsible>

      <Collapsible
        title="Recent workflows"
        link={
          <Link href={`/residents/${resident.id}/workflows`}>
            <a className="lbh-link lbh-link--muted">See all</a>
          </Link>
        }
      >
        <WorkflowOverview workflows={workflows} socialCareId={resident.id} />
      </Collapsible>

      <DataBlock
        title="Housing"
        socialCareId={resident.id}
        list={[
          {
            label: 'Address',
            name: 'address',
            beforeDisplay: (val) => (
              <div className="govuk-!-margin-bottom-1">
                {(val as Address).address}
                <br />
                {(val as Address).postcode}
                <br />
                <a
                  className="lbh-link lbh-link--no-visited-state"
                  href={`https://maps.google.com?q=${
                    (val as Address).address
                  },${(val as Address).postcode}`}
                >
                  Get directions
                </a>
              </div>
            ),
          },
          // {
          //   label: 'Addresses',
          //   name: 'addresses',
          //   beforeDisplay: (val) => JSON.stringify(val),
          // },
        ]}
      />

      <Mapping resident={resident} />
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
