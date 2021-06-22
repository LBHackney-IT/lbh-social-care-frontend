import Seo from 'components/Layout/Seo/Seo';
import SavedForms from 'components/SaveFormData/SaveFormData';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import { GetServerSideProps } from 'next';
import { getUnfinishedSubmissions } from 'lib/submissions';
import { Submission } from 'data/flexibleForms/forms.types';

interface Props {
  submissions: Submission[];
}

const UnfinishedSubmissions = ({ submissions }: Props): React.ReactElement => (
  <>
    <Seo title="Unfinished submissions" />
    <DashboardWrapper>
      <SavedForms />
    </DashboardWrapper>
  </>
);

export default UnfinishedSubmissions;

export const getServerSideProps: GetServerSideProps = async () => {
  const submissions = await getUnfinishedSubmissions();

  return {
    props: {
      submissions,
    },
  };
};
