import { useRouter } from 'next/router';

import form from 'data/forms/cfs-case-notes-recording';
import FormCasesWrapper from 'components/FormCasesWrapper/FormCasesWrapper';

const CfsCaseNotesRecording = () => {
  const { query } = useRouter();
  return (
    <FormCasesWrapper
      personId={query.id}
      title="Case note"
      form={form}
      formNameOverall="CFS_case_note"
    />
  );
};

export default CfsCaseNotesRecording;
