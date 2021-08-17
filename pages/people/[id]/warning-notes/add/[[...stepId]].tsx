import { useRouter } from 'next/router';

import { AddWarningNoteForm } from 'components/WarningNotes/AddWarningNoteForm/AddWarningNoteForm';

const AddWarningNotePage: React.FC = () => {
  const { query } = useRouter();
  const personId = Number(query.id as string);

  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add Warning Note
      </h1>

      <AddWarningNoteForm personId={personId} />
    </>
  );
};

export default AddWarningNotePage;
