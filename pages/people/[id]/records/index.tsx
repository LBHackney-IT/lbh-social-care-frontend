import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import AddForm from 'components/AddForm/AddForm';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import { Resident } from 'types';

const AddNewRecordPage = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  return (
    <>
      <Seo title={`Add a new record for #${query.id}`} />
      <BackButton />
      <main className="lbh-main-wrapper" id="main-content" role="main">
        <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
          Add a new record for
        </h1>
        <PersonView personId={personId} expandView>
          {(person: Resident) => <AddForm person={person} />}
        </PersonView>
      </main>
    </>
  );
};

export default AddNewRecordPage;
