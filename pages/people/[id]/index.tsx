import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import PersonDetails from 'components/PersonView/PersonDetails';
import Cases from 'components/Cases/Cases';
import AllocatedWorkers from 'components/AllocatedWorkers/AllocatedWorkers';
import WarningNotes from 'components/WarningNote/WarningNotes';
import Stack from 'components/Stack/Stack';

const PersonPage = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  return (
    <>
      <Seo title={`Person Details - #${query.id}`} />
      <BackButton />
      <main className="lbh-main-wrapper" id="main-content" role="main">
        <PersonView personId={personId} showPersonDetails={false}>
          {(person) => (
            <Stack space={7} className="govuk-!-margin-top-7">
              <WarningNotes id={personId} />
              <PersonDetails person={person} />
              <AllocatedWorkers id={personId} />
              <Cases id={personId} person={person} />
            </Stack>
          )}
        </PersonView>
      </main>
    </>
  );
};

export default PersonPage;
