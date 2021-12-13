import { render, screen } from '@testing-library/react';
import { FeatureFlagProvider } from '../../lib/feature-flags/feature-flags';
import { useAuth } from 'components/UserContext/UserContext';
import { mockedUser, mockedUserInWorkflowsPilot } from 'factories/users';
import Layout from './index';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
  }),
}));

jest.mock('./Header/Header', () => () => 'Header');
jest.mock('./PhaseBanner/PhaseBanner', () => () => 'MockedPhaseBanner');

jest.mock('components/UserContext/UserContext');
(useAuth as jest.Mock).mockReturnValue({
  user: mockedUser,
});

describe('Layout component', () => {
  it('should render properly', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockedUser,
    });

    const { asFragment } = render(
      <FeatureFlagProvider features={{}}>
        <Layout goBackButton={false} noLayout={false}>
          <p>I am the children</p>
        </Layout>
      </FeatureFlagProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("doesn't throw an error if user is not logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: undefined,
    });

    expect(() => {
      render(
        <FeatureFlagProvider features={{}}>
          <Layout goBackButton={false} noLayout={false}>
            <p>I am the children</p>
          </Layout>
        </FeatureFlagProvider>
      );
    }).not.toThrowError(TypeError);
  });

  it('displays the onboarding dialog if user is in workflows pilot', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockedUserInWorkflowsPilot,
    });

    render(
      <FeatureFlagProvider features={{}}>
        <Layout goBackButton={false} noLayout={false}>
          <p>I am the children</p>
        </Layout>
      </FeatureFlagProvider>
    );

    expect(
      screen.queryByText(
        "Good news! You're part of the brand new workflow pilot."
      )
    ).toBeVisible();
  });

  it("doesn't display the onboarding dialog if user is not in workflows pilot", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockedUser,
    });

    render(
      <FeatureFlagProvider features={{}}>
        <Layout goBackButton={false} noLayout={false}>
          <p>I am the children</p>
        </Layout>
      </FeatureFlagProvider>
    );

    expect(
      screen.queryByText(
        "Good news! You're part of the brand new workflow pilot."
      )
    ).not.toBeInTheDocument();
  });
});
