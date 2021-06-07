import Seo from 'components/Layout/Seo/Seo';
import MyAllocatedCases from 'components/AllocatedCases/MyAllocatedCases';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';

/**
 * This page, the Dashboard, is being exposed for internal testing at `{domain}/__dashboard`.
 *
 * Once the Dashboard is ready to launch, this file should be removed, and the redirect
 *  (see `getServerSideProps()` in `/pages/index.tsx`) should be removed, so the
 *  dashboard is available at the `{domain}/` route.
 *
 * `/components/Dashboard/DashboardWrapper.tsx` will also need to change to modify the base path of
 *  the dashboard from `/__dashboard` to `/`.
 */

const MyCasesPage = (): React.ReactElement => (
  <div>
    <Seo title="My Work Space" />
    <DashboardWrapper>
      <>
        <p className="govuk-body">People you are working with</p>
        <MyAllocatedCases />
      </>
    </DashboardWrapper>
  </div>
);

export default MyCasesPage;
