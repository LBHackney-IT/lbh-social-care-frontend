import { getResident } from 'lib/residents';
import Layout from 'components/NewPersonView/Layout';
import { GetServerSideProps } from 'next';
import { Resident } from 'types';
import { useCasesByResident } from 'utils/api/cases';
import { Case } from 'types';
import PersonTimeline from 'components/NewPersonView/PersonTimeline';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useUnfinishedSubmissions } from 'utils/api/submissions';

interface Props {
  person: Resident;
}

const PersonPage = ({ person }: Props): React.ReactElement => {
  const {
    data: casesData,
    size,
    setSize,
    error: casesError,
  } = useCasesByResident(person.id);

  const { data: submissionsData, error: submissionsError } =
    useUnfinishedSubmissions(person.id);

  // flatten pagination
  const events = casesData?.reduce(
    (acc, page) => acc.concat(page.cases as Case[]),
    [] as Case[]
  );

  // grab submissions for this resident only
  const submissions = submissionsData?.submissions.filter((sub) =>
    sub.residents.some((resident) => resident.id === person.id)
  );

  return (
    <Layout person={person}>
      {events ? (
        <PersonTimeline
          unfinishedSubmissions={submissions}
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
