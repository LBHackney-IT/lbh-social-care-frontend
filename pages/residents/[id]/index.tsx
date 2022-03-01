import CaseNoteGrid from 'components/ResidentPage/CaseNoteGrid';
import Collapsible from 'components/ResidentPage/Collapsible';
import DataBlock from 'components/ResidentPage/DataBlock';
import Layout from 'components/ResidentPage/Layout';
import Mapping from 'components/ResidentPage/Mapping';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import {
  Address,
  GPDetails,
  KeyContact,
  OtherName,
  PhoneNumber,
  Resident,
} from 'types';
import { useCases } from 'utils/api/cases';
import { isAuthorised } from 'utils/auth';
import Link from 'next/link';
import { formatDate } from 'utils/date';
import SEXUAL_ORIENTATIONS from 'data/orientation';
import languages from 'data/languages';
import useWorkflows from 'hooks/useWorkflows';
import WorkflowOverview from 'components/ResidentPage/WorkflowOverview';
import CustomPhoneNumberEditor from 'components/ResidentPage/CustomPhoneNumberEditor';
import CustomAddressEditor from 'components/ResidentPage/CustomAddressEditor';
import { simpleEthnicities } from 'data/ethnicities';
import CustomKeyContactsEditor from 'components/ResidentPage/CustomKeyContactsEditor';
import CustomGPDetailsEditor from 'components/ResidentPage/CustomGPDetailsEditor';
import { useTeams } from 'utils/api/allocatedWorkers';
import { differenceInYears } from 'date-fns';
import primarySupportReasons from 'data/primarySupportReasons';

interface Props {
  resident: Resident;
}

const ResidentPage = ({ resident }: Props): React.ReactElement => {
  const { data: casesData } = useCases({
    mosaic_id: resident.id,
    exclude_audit_trail_events: true,
    pinned_first: true,
  });
  const { data: workflowsData } = useWorkflows(resident.id);
  const { data: teamData } = useTeams({
    ageContext: resident.contextFlag,
  });

  const cases = casesData?.[0].cases.slice(0, 3); // only the first three cases
  const totalCount = casesData?.[0]?.totalCount || 0;
  const workflows = workflowsData?.workflows;

  const teamOptions = teamData?.teams?.map((team) => ({
    label: team.name,
    value: team.id,
  }));

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
            name: 'allocatedTeam',
            label: 'Allocated team',
            options: teamOptions,
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

            markAsRequired: true,
          },
          { label: 'Last name', name: 'lastName', markAsRequired: true },
          {
            label: 'Other names',
            name: 'otherNames',
            beforeDisplay: (val) => (val as OtherName[])?.[0]?.firstName,
            beforeEdit: (val) => (val as OtherName[])?.[0]?.firstName,
            beforeSave: (val) => [{ firstName: val, lastName: '' }],
          },
          {
            label: 'Born',
            name: 'dateOfBirth',
            markAsRequired: true,
            beforeDisplay: (val) =>
              formatDate(val as string)
                ? `${formatDate(val as string)} (age ${differenceInYears(
                    new Date(),
                    new Date(val as string)
                  )})`
                : '',
            beforeEdit: (val) => (val as string)?.split('T')[0],
            type: 'date',
          },
          {
            label: 'Died',
            name: 'dateOfDeath',
            beforeDisplay: (val) => formatDate(val as string) || '',
            beforeEdit: (val) => (val as string)?.split('T')[0],
            beforeSave: (val) => val || null,
            type: 'date',
          },
          {
            label: 'Gender',
            name: 'gender',
            options: [
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
            label: 'Same gender as assigned at birth?',
            name: 'genderAssignedAtBirth',
            beforeSave: (val) => val === 'Yes',
            beforeEdit: (val) => (val ? 'Yes' : 'No'),
            options: [
              {
                label: 'Yes',
              },
              {
                label: 'No',
              },
            ],
          },
          {
            label: 'Pronoun',
            name: 'pronoun',
            options: [
              {
                label: 'He/him',
              },
              {
                label: 'They/them',
              },
              {
                label: 'She/her',
              },
              {
                label: 'Other or none',
              },
            ],
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
            label: 'Ethnicity',
            name: 'ethnicity',
            options: [
              {
                value: '',
                label: 'Not known',
              },
            ].concat(
              simpleEthnicities.sort().map((eth) => ({
                label: eth,
                value: eth,
              }))
            ),
          },
          {
            label: 'Email address',
            name: 'emailAddress',
            showInSummary: true,
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
            showInSummary: true,
            beforeDisplay: (val) => (
              <ul className="lbh-list lbh-body-s ">
                {(val as PhoneNumber[]).map((number) => (
                  <li
                    key={`${number.type}-${number.number}`}
                    className="govuk-!-margin-top-0"
                  >
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
            render: CustomPhoneNumberEditor,
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

          {
            name: 'religion',
            label: 'Religion',
          },
          {
            name: 'employment',
            label: 'Employment',
            options: [
              { label: 'Paid: Less than 16 hours a week' },
              { label: 'Paid: 16 or more hours a week' },
              { label: 'Not in paid employment (seeking work)' },
              {
                label:
                  'Not in paid employment (not actively seeking work / retired)',
              },
              { label: 'Not in paid employment (voluntary work only)' },
              { label: 'Not known', value: '' },
            ],
          },
          {
            name: 'maritalStatus',
            label: 'Marital status',
            options: [
              { label: 'Single' },
              { label: 'Married/civil partnership' },
              { label: 'Cohabiting/living together' },
              { label: 'Divorced/separated' },
              { label: 'Widowed' },
              { label: 'Not known', value: '' },
            ],
          },
          {
            name: 'immigrationStatus',
            label: 'Immigration status',
          },
          {
            name: 'careProvider',
            label: 'Care provider',
          },
          {
            name: 'primarySupportReason',
            label: 'Primary support reason',
            options: Object.entries(primarySupportReasons).map(
              ([short, long]) => ({ label: long, value: short })
            ),
          },
          // {
          //   name: 'openCase',
          //   label: 'Open case?',
          //   beforeSave: (val) => val === 'Yes',
          //   beforeEdit: (val) => (val ? 'Yes' : 'No'),
          //   options: [
          //     {
          //       label: 'Yes',
          //     },
          //     {
          //       label: 'No',
          //     },
          //   ],
          // },
        ]}
      />

      <DataBlock
        title="Health and disability"
        socialCareId={resident.id}
        list={[
          {
            label: 'NHS number',
            name: 'nhsNumber',
            showInSummary: true,
            beforeSave: (val) => parseInt(val as string),
          },
          {
            name: 'gpDetails',
            label: 'GP',
            showInSummary: true,
            render: CustomGPDetailsEditor,
            beforeDisplay: (val) => {
              const gp = val as GPDetails;
              return (
                <ul className="lbh-list lbh-body-s ">
                  <li className="govuk-!-margin-top-0">
                    <strong>{gp.name}</strong>
                  </li>
                  <li className="govuk-!-margin-top-0">{gp.address}</li>
                  <li className="govuk-!-margin-top-0">{gp.postcode}</li>
                  <li className="govuk-!-margin-top-0">
                    <a href={`mailto:${gp.email}`}>{gp.email}</a>
                  </li>
                  <li className="govuk-!-margin-top-0">{gp.phoneNumber}</li>
                </ul>
              );
            },
          },
          {
            name: 'disabilities',
            label: 'Disabilities',
            multiple: true,
            showInSummary: true,
            beforeDisplay: (val) => (
              <div className="">{(val as string[])?.join(', ')}</div>
            ),
            options: [
              { label: 'Dementia' },
              { label: 'Physical disabilities' },
              { label: 'Mental health/acquired brain injury' },
            ],
          },
          {
            name: 'mentalHealthSectionStatus',
            label: 'Mental health section status',
            options: [
              {
                label: 'None',
              },
              {
                label:
                  'Guardianship under Section 37 MHA 1983 (S37 - order to place offender under local social services authority)',
              },
              {
                label:
                  'Guardianship under Section 7 MHA 1983 (S7 - order to place person under local social services authority)',
              },
              {
                label:
                  'Section 117 MHA 1983 (S117 - support given after discharged from hospital)',
              },
              {
                label:
                  'Section 2 MHA 1983 (S2 - admission to hospital for assessment)',
              },
              {
                label:
                  'Section 3 MHA 1983 (S3 - admission to hospital for treatment)',
              },
            ],
          },

          {
            name: 'deafRegister',
            label: 'Hearing loss',
            options: [
              {
                label: 'Yes, registered',
              },
              {
                label: 'Yes, not registered',
              },
              {
                label: 'No hearing loss',
              },
              {
                label: 'Not known',
                value: '',
              },
            ],
          },

          {
            name: 'blindRegister',
            label: 'Sight loss',
            options: [
              {
                label: 'Yes, certified blind (severe)',
              },
              {
                label: 'Yes, certified partially sighted',
              },
              {
                label: 'Yes, registered blind (severe)',
              },
              {
                label: 'Yes, registered partially sighted',
              },
              {
                label: 'Yes, not registered or certified',
              },
              {
                label: 'No sight loss',
              },
              {
                label: 'Not known',
                value: '',
              },
            ],
          },
          {
            name: 'blueBadge',
            label: 'Blue badge',
          },
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
            <>
              <CaseNoteGrid
                cases={cases}
                resident={resident}
                totalCount={totalCount}
              />
              <Link href={`/residents/${resident.id}/case-notes`}>
                <a className="lbh-link lbh-link--muted lbh-body-xs govuk-!-margin-top-2">
                  See all {totalCount} case notes
                </a>
              </Link>
            </>
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
            showInSummary: true,
            beforeDisplay: (val) => {
              const address = val as Address;
              return (
                <div className="govuk-!-margin-bottom-1">
                  {address.address}
                  <br />
                  {address.postcode}
                  <br />
                  <a
                    className="lbh-link lbh-link--no-visited-state"
                    href={`https://maps.google.com?q=${address.address},${address.postcode}`}
                  >
                    Get directions
                  </a>
                </div>
              );
            },
            render: CustomAddressEditor,
          },
          {
            label: 'Living situation',
            name: 'livingSituation',
            showInSummary: true,
            options: [
              { label: 'Lives alone', value: 'Lives alone' },
              { label: 'Lives with others', value: 'Lives with others' },
              { label: 'Not known', value: '' },
            ],
          },
          {
            label: 'Access to home (eg. keybox)',
            name: 'accessToHome',
            showInSummary: true,
          },
          {
            label: 'Accomodation type',
            name: 'accomodationType',
            showInSummary: true,
            options: [
              {
                label: 'Owner occupier or shared ownership scheme',
              },
              {
                label:
                  'Tenant of a local authority, arms length management organisations, registered social landlord or housing association',
              },
              {
                label: 'Tenant of a private landlord',
              },
              {
                label:
                  'Settled mainstream housing with family or friends (including flat sharing)',
              },
              {
                label:
                  'Supported accommodation, supported lodgings or supported group home (i.e. accommodation supported by staff or resident care taker)',
              },
              { label: 'Shared lives scheme' },
              {
                label:
                  'Approved premises for offenders released from prison or under probation supervision (e.g. probation hostel)',
              },
              {
                label:
                  'Sheltered housing, extra care housing or other sheltered housing',
              },
              {
                label:
                  'Mobile accommodation for Gypsy/Roma and Traveller communities',
              },
              { label: 'Rough sleeper or squatting' },
              {
                label:
                  'Night shelter, emergency hostel or direct access hostel (temporary accommodation accepting self-referrals)',
              },
              { label: 'Refuge' },
              {
                label:
                  'Placed in temporary accommodation by the council (including homelessness resettlement)',
              },
              { label: 'Staying with family/friends as a short-term guest' },
              {
                label:
                  'Acute or long-term healthcare residential facility or hospital (e.g. NHS Independent general hospital/clinic, long-stay hospital, specialist rehabilitation/recovery hospital)',
              },
              { label: 'Registered care home' },
              { label: 'Registered nursing home' },
              {
                label: 'Prison/young offenders institution / detention centre',
              },
              { label: 'Other temporary accommodation' },
            ],
          },
          {
            label: 'Known to housing staff?',
            name: 'housingStaffInContact',
            beforeEdit: (val) => (val ? 'yes' : 'no'),
            beforeSave: (val) => val === 'yes',
            options: [
              {
                label: 'Yes',
                value: 'yes',
              },
              {
                label: 'No',
                value: 'no',
              },
            ],
          },
          {
            label: "Housing officer's name",
            name: 'housingOfficer',
          },
          // {
          //   label: 'Tenure type',
          //   name: 'tenureType',
          // },
          // {
          //   label: 'Cautionary alert',
          //   name: 'cautionaryAlert',
          // },
          // {
          //   label: 'Possession or eviction order',
          //   name: 'possessionEvictionOrder',
          // },
          // {
          //   label: 'Rent record',
          //   name: 'rentRecord',
          // },
          // {
          //   label: 'Housing benefit',
          //   name: 'housingBenefit',
          // },
          // {
          //   label: 'Council tenure type',
          //   name: 'councilTenureType',
          // },
          // {
          //   label: 'Tenancy household structure',
          //   name: 'tenancyHouseholdStructure',
          // },
          // {
          //   label: 'Addresses',
          //   name: 'addresses',
          //   beforeDisplay: (val) => JSON.stringify(val),
          // },
        ]}
        aside={<Mapping socialCareId={resident.id} />}
      />

      <DataBlock
        title="Relationships and support network"
        socialCareId={resident.id}
        footer={
          <Link href={`/residents/${resident.id}/relationships`}>
            <a className="lbh-link lbh-link--muted lbh-body-xs">
              See all relationships
            </a>
          </Link>
        }
        list={[
          {
            label: 'Key contacts',
            name: 'keyContacts',
            render: CustomKeyContactsEditor,
            showInSummary: true,
            beforeDisplay: (val) => (
              <ul className="lbh-list lbh-body-s ">
                {(val as KeyContact[]).map((contact, i) => (
                  <li key={i} className="govuk-!-margin-top-0">
                    <strong>{contact.name}:</strong>{' '}
                    <a
                      className="lbh-link lbh-link--no-visited-state"
                      href={`mailto:${contact.email}`}
                    >
                      {contact.email}
                    </a>
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
      />

      <DataBlock
        title="Communication needs and preferences"
        list={[
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
            label: 'Preferred language',
            name: 'preferredLanguage',
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
            label: 'Fluent in English?',
            name: 'fluentInEnglish',
            showInSummary: true,
            beforeSave: (val) => val === 'Yes',
            options: [
              {
                label: 'Yes',
              },
              {
                label: 'No',
              },
            ],
          },
          {
            label: 'Interpreter needed?',
            name: 'interpreterNeeded',
            showInSummary: true,
            beforeSave: (val) => val === 'Yes',
            options: [
              {
                label: 'Yes',
              },
              {
                label: 'No',
              },
            ],
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
            name: 'techUse',
            label: 'What technology do they use?',
            multiple: true,
            beforeDisplay: (val) => (
              <div className="">{(val as string[])?.join(', ')}</div>
            ),
            options: [
              {
                label: 'Mobile phone',
              },
              {
                label: 'Landline phone',
              },
              {
                label: 'Internet',
              },
              {
                label: 'Telecare',
              },
              {
                label: 'Smart home device (Amazon Alexa, Google Home, etc',
              },
            ],
          },
          {
            name: 'difficultyMakingDecisions',
            label: 'Any difficulty making decisions?',
            beforeSave: (val) => val === 'Yes',
            beforeEdit: (val) => (val ? 'Yes' : 'No'),
            options: [
              {
                label: 'Yes',
              },
              {
                label: 'No',
              },
            ],
          },
          {
            name: 'communicationDifficulties',
            label: 'Any difficulty communicating?',
            beforeSave: (val) => val === 'Yes',
            beforeEdit: (val) => (val ? 'Yes' : 'No'),
            options: [
              {
                label: 'Yes',
              },
              {
                label: 'No',
              },
            ],
          },
          {
            name: 'communicationDifficultiesDetails',
            label: 'Details',
          },
        ]}
        socialCareId={resident.id}
      />
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

  // the new resident view is adults-only
  if (resident.contextFlag === 'C') {
    return {
      props: {},
      redirect: {
        destination: `/people/${resident.id}`,
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
