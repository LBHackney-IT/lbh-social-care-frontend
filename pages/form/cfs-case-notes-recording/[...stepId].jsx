import form from 'data/forms/cfs-case-notes-recording';
import FormCasesWrapper from 'components/FormCasesWrapper/FormCasesWrapper';

const CfsCaseNotesRecording = ({ query }) => (
  <FormCasesWrapper
    personId={query.id}
    title="Case note"
    form={form}
    formNameOverall="CFS_case_note"
  />
);

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  return {
    props: {
      query,
    },
  };
};

export default CfsCaseNotesRecording;
