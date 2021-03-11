import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import Cases from 'components/Cases/Cases';
import AllocatedWorkers from 'components/AllocatedWorkers/AllocatedWorkers';
import { Resident } from 'types';
import React from 'react';
import WarningNotes from 'components/WarningNote/WarningNotes';

const PersonPage = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  return (
    <div>
      <Seo title={`#${query.id} Cases`} />
      <BackButton />
      <PersonView personId={personId} showPersonDetails={false}>
        {(person) => (
          <>
            <WarningNotes id={personId} />
            <AllocatedWorkers id={personId} />
            <Cases id={personId} person={person} />
          </>
        )}
      </PersonView>
    </div>
  );
};

export default PersonPage;
