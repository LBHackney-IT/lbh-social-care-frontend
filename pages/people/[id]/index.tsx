import { getResident } from 'lib/residents';
import Layout from 'components/NewPersonView/Layout';
import { GetServerSideProps } from 'next';
import { Resident, User } from 'types';
import { useCasesByResident } from 'utils/api/cases';
import { Case } from 'types';
import PersonTimeline from 'components/NewPersonView/PersonTimeline';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useUnfinishedSubmissions } from 'utils/api/submissions';
import { canManageCases } from 'lib/permissions';
import { useAuth } from 'components/UserContext/UserContext';

interface Props {
  person: Resident;
}

const PersonPage = ({ person }: Props): React.ReactElement => {
  const { user } = useAuth() as { user: User };
  const {
    data: casesData,
    size,
    setSize,
    error: casesError,
  } = useCasesByResident(person.id);
  const { data: submissionsData } = useUnfinishedSubmissions(person.id);

  // flatten pagination
  const events = casesData?.reduce(
    (acc, page) => acc.concat(page.cases as Case[]),
    [] as Case[]
  );

  return (
    <Layout person={person}>
      {events && canManageCases(user, person) ? (
        <PersonTimeline
          unfinishedSubmissions={submissionsData?.submissions}
          events={events}
          size={size}
          setSize={setSize}
        />
      ) : casesError ? (
        <ErrorMessage label={casesError.message} />
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

PersonPage.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const person = await getResident(Number(params?.id));

  if (!person.id) {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  return {
    props: {
      person,
    },
  };
};

export default PersonPage;
