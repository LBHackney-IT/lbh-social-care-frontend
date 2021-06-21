import { render } from '@testing-library/react';
import { FeatureFlagContext } from '../../lib/feature-flags/feature-flags';

import Layout from './index';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
  }),
}));

jest.mock('./Header/Header', () => () => 'Header');
jest.mock('./PhaseBanner/PhaseBanner', () => () => 'MockedPhaseBanner');

describe('Layout component', () => {
  it('should render properly', async () => {
    const { asFragment } = render(
      <FeatureFlagContext features={{}}>
        <Layout>
          <p>I am the children</p>
        </Layout>
      </FeatureFlagContext>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
