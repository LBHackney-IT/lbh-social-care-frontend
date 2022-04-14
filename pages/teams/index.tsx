import Seo from 'components/Layout/Seo/Seo';
import { GetServerSideProps } from 'next';
import { isAuthorised } from 'utils/auth';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import TeamsList from 'components/TeamPage/TeamsList/TeamsList';

const TeamsPage = (): React.ReactElement => {
  return (
    <>
      <Seo title={`Teams`} />
      <DashboardWrapper>
        <>
          <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
            Teams
          </h1>
          <div className="govuk-!-margin-top-7">
            <TeamsList />
          </div>
        </>
      </DashboardWrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const user = isAuthorised(req);

  // redirect unauthorised users to login
  if (!user) {
    return {
      props: {},
      redirect: {
        destination: `/login`,
      },
    };
  }

  return {
    props: {
      id: Number(params?.id),
    },
  };
};

export default TeamsPage;
