import form from 'data/forms/case-notes-recording';
import FormCasesWrapper from 'components/FormCasesWrapper/FormCasesWrapper';

const CaseNotesRecording = ({ query }) => (
  <FormCasesWrapper
    personId={query.id}
    title="Add a new case note"
    form={form}
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
