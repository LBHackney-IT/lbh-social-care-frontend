import CaseNoteGrid from 'components/ResidentPage/CaseNoteGrid';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { useCases } from 'utils/api/cases';
import { isAuthorised } from 'utils/auth';
import useWorkflows from 'hooks/useWorkflows';
import { useTeams } from 'utils/api/allocatedWorkers';
import { useAuth } from 'components/UserContext/UserContext';
import { prettyResidentName } from 'lib/formatters';
import Head from 'next/head';
import s from '../../../stylesheets/Shareable.module.scss';
import WorkflowTree from 'components/ResidentPage/WorkflowTree';
import FlexibleAnswers from 'components/FlexibleAnswers/FlexibleAnswers';
import { useRelationships } from 'utils/api/relationships';
import RelationshipsTable from 'components/ResidentPage/RelationshipsTable';
import { FlexibleAnswers as FlexibleAnswersT } from 'data/flexibleForms/forms.types';

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
  const { data: relationshipsData } = useRelationships(resident.id);
  const { user } = useAuth();

  const cases = casesData?.[0].cases;

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
      <FlexibleAnswers answers={{ resident } as unknown as FlexibleAnswersT} />

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

      <h2>Relationships</h2>
      {relationshipsData && (
        <RelationshipsTable relationships={relationshipsData} />
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
