import { render } from '@testing-library/react';

import DashboardWrapper from './DashboardWrapper';

const mockedUseRouter = { pathname: '/my-cases' };

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

describe(`DashboardWrapper`, () => {
  it('should render properly', () => {
    const { asFragment } = render(
      <DashboardWrapper>
        <div>foo</div>
      </DashboardWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
