import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import PersonDetails from 'components/PersonView/PersonDetails';
import Cases from 'components/Cases/Cases';
import AllocatedWorkers from 'components/AllocatedWorkers/AllocatedWorkers';
import WarningNotes from 'components/WarningNote/WarningNotes';
import Stack from 'components/Stack/Stack';
import { useAuth } from 'components/UserContext/UserContext';
import { User } from 'types';

const PersonPage = (): React.ReactElement => {
  const { query } = useRouter();
  const { user } = useAuth() as { user: User };
  const personId = Number(query.id as string);
  return (
    <>
      <Seo title={`Person Details - #${query.id}`} />
      <BackButton />
      <PersonView
        personId={personId}
        showPersonDetails={false}
        canEdit={user.hasAdminPermissions}
      >
        {(person) => (
          <Stack space={7} className="govuk-!-margin-top-7">
            <WarningNotes id={personId} />
            <PersonDetails person={person} />
            <AllocatedWorkers id={personId} />
            <Cases id={personId} person={person} />
          </Stack>
        )}
      </PersonView>
    </>
  );
};

export default PersonPage;
