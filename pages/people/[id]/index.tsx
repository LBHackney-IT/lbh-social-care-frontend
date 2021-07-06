import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import { PersonDetailsPage } from 'components/pages/people/PersonDetailsPage';

const PersonPage = (): React.ReactElement => {
  const { query } = useRouter();

  const personId = Number(query.id as string);

  return (
    <>
      <Seo title={`Person Details - #${query.id}`} />
      <PersonDetailsPage personId={personId} />
    </>
  );
};

PersonPage.goBackButton = true;

export default PersonPage;
