import { useRouter } from 'next/router';

import form from 'data/forms/case-notes-recording';
import FormCasesWrapper from 'components/FormCasesWrapper/FormCasesWrapper';

const CaseNotesRecording = () => {
  const { query } = useRouter();
  return (
    <FormCasesWrapper
      personId={query.id}
      title="Case note"
      form={form}
      formNameOverall="ASC_case_note"
    />
  );
};

export default CaseNotesRecording;
