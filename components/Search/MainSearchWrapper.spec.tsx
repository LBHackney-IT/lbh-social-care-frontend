import { render } from '@testing-library/react';

import MainSearchWrapper from './MainSearchWrapper';

const mockedUseRouter = { pathname: '/' };

jest.mock('components/Search/Search', () => () => 'MockedSearch');

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

describe(`MainSearchWrapper`, () => {
  it('should render properly', () => {
    const { asFragment } = render(<MainSearchWrapper type="people" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
