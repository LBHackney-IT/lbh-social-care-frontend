import form from 'data/forms/case-notes-recording';
import FormCasesWrapper from 'components/FormCasesWrapper/FormCasesWrapper';

const CaseNotesRecording = ({ query }) => (
  <FormCasesWrapper
    personId={query.id}
    title="Case note"
    form={form}
    formNameOverall="ASC_case_note"
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

export default CaseNotesRecording;
