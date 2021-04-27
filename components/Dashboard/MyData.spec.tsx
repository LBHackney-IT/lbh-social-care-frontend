import { fireEvent, render } from '@testing-library/react';

import { mockedUser } from 'factories/users';
import * as meAPI from 'utils/api/me';
import MyData from './MyData';
import { mockedAllocations } from 'factories/allocatedWorkers';
import { mockedWorker } from 'factories/workers';

const mockedUseRouter = {
  query: { foo: 'bar' },
  replace: jest.fn(),
  pathname: 'foopath',
};

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`MyData`, () => {
  jest.spyOn(meAPI, 'useMyData').mockImplementation(() => ({
    data: {
      ...mockedWorker,
      allocations: mockedAllocations,
      auth: mockedUser,
    },
    revalidate: jest.fn(),
    mutate: jest.fn(),
    isValidating: false,
  }));

  it('should render properly', async () => {
    const { asFragment, getByRole } = render(<MyData />);
    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(getByRole('button'));
    expect(asFragment()).toMatchSnapshot();
    expect(mockedUseRouter.replace).toHaveBeenCalledWith(
      'foopath?details=true',
      'foopath?details=true',
      {
        scroll: false,
        shallow: true,
      }
    );
  });
});
