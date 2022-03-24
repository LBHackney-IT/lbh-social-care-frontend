import CaseNoteGrid from 'components/ResidentPage/CaseNoteGrid';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { useCases } from 'utils/api/cases';
import { isAuthorised } from 'utils/auth';
import useWorkflows from 'hooks/useWorkflows';
import { prettyResidentName } from 'lib/formatters';
import Head from 'next/head';
import s from '../../../stylesheets/Shareable.module.scss';
import WorkflowTree from 'components/ResidentPage/WorkflowTree';
import { useRelationships } from 'utils/api/relationships';
import RelationshipsTable from 'components/ResidentPage/RelationshipsTable';
import { canManageCases } from 'lib/permissions';
import { useAuth } from 'components/UserContext/UserContext';

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
  const { data: relationshipsData } = useRelationships(resident.id);

  const cases = casesData?.[0].cases;

  const { user } = useAuth();

  return (
    <div className={s.shareable}>
      <Head>
        <title>{prettyResidentName(resident)}</title>
      </Head>
      <h1>{prettyResidentName(resident)}</h1>
      <button className={`lbh-link ${s.button}`} onClick={() => window.print()}>
        Print or save as PDF
      </button>

      <h2>Details</h2>
      <dl className="govuk-summary-list lbh-summary-list">
        {Object.entries(resident).map(([key, value]) => (
          <div className="govuk-summary-list__row" key={key}>
            <dt className="govuk-summary-list__key">{key}</dt>
            <dl className="govuk-summary-list__value">
              {['string', 'number', 'boolean'].includes(typeof value)
                ? value.toString()
                : JSON.stringify(value, null, 2)}
            </dl>
          </div>
        ))}
      </dl>

      <h2>Relationships</h2>
      {relationshipsData && (
        <RelationshipsTable relationships={relationshipsData} />
      )}

      {user && canManageCases(user, resident) && (
        <>
          <h2>Case notes</h2>
          <p>Only most recent 20 shown</p>
          {cases && (
            <CaseNoteGrid
              cases={cases}
              resident={resident}
              totalCount={cases.length}
            />
          )}

          <h2>Workflows</h2>
          {workflowsData?.workflows && (
            <WorkflowTree
              resident={resident}
              workflows={workflowsData?.workflows}
            />
          )}
        </>
      )}
    </div>
  );
};

ResidentPage.noLayout = true;

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
