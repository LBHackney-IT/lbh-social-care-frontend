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
import { canManageCases } from 'lib/permissions';
import { isAuthorised } from 'utils/auth';

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
  const { data: submissionsData } = useUnfinishedSubmissions(person.id);

  // flatten pagination
  const events = casesData?.reduce(
    (acc, page) => acc.concat(page.cases as Case[]),
    [] as Case[]
  );

  const onLastPage = !casesData?.[casesData.length - 1].nextCursor;

  return (
    <Layout person={person}>
      {events ? (
        events.length > 0 ? (
          <>
            <PersonTimeline
              unfinishedSubmissions={submissionsData || { items: [], count: 0 }}
              events={events}
              size={size}
              setSize={setSize}
              onLastPage={onLastPage}
            />
          </>
        ) : (
          <p>No events to show</p>
        )
      ) : casesError ? (
        <ErrorMessage label={casesError.message} />
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

PersonPage.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const user = isAuthorised(req);

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: `/login`,
      },
    };
  }

  const person = await getResident(Number(params?.id), user);

  if (!person.id) {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  if (!canManageCases(user, person)) {
    return {
      props: {},
      redirect: {
        destination: `/people/${person.id}/details`,
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
