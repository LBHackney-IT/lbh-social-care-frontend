import Seo from 'components/Layout/Seo/Seo';
import SavedForms from 'components/SaveFormData/SaveFormData';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import { GetServerSideProps } from 'next';
import { getInProgressSubmissions } from 'lib/submissions';
import { InProgressSubmission } from 'data/flexibleForms/forms.types';
import SubmissionsTable from 'components/SubmissionsTable';
import { isAuthorised } from 'utils/auth';
import { Paginated } from 'types';
import { setUser } from '@sentry/nextjs';

interface Props {
  submissions: Paginated<InProgressSubmission>;
}

const UnfinishedSubmissions = ({ submissions }: Props): React.ReactElement => (
  <>
    <Seo title="Work in progress" />
    <DashboardWrapper>
      <>
        <h1 className="govuk-!-margin-bottom-8">Work in progress</h1>

        {submissions.items?.length > 0 && (
          <SubmissionsTable
            submissions={submissions.items}
            everyoneCount={submissions.count}
          />
        )}
        <SavedForms />
      </>
    </DashboardWrapper>
  </>
);

export default UnfinishedSubmissions;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = isAuthorised(req);
  setUser({ email: user?.email });
  const submissions = await getInProgressSubmissions(user?.permissionFlag);

  return {
    props: {
      submissions,
    },
  };
};
