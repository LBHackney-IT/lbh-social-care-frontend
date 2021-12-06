import { render, screen } from '@testing-library/react';
import { AppConfigProvider } from 'lib/appConfig';
import DashboardWrapper from './DashboardWrapper';

const mockedUseRouter = { pathname: '/my-cases' };

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

describe(`DashboardWrapper`, () => {
  it('should render properly', () => {
    const { asFragment } = render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <DashboardWrapper>
          <div>foo</div>
        </DashboardWrapper>
      </AppConfigProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays link for workflows', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <DashboardWrapper>
          <div>foo</div>
        </DashboardWrapper>
      </AppConfigProvider>
    );

    expect(screen.queryByText('Workflows')).toBeVisible();
    expect(screen.queryByText('Workflows')).toHaveAttribute(
      'href',
      'http://example.com'
    );
  });
});
