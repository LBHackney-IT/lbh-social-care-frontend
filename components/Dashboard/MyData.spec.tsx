import { fireEvent, render } from '@testing-library/react';

import { mockedUser } from 'factories/users';
import * as meAPI from 'utils/api/me';
import MyData from './MyData';
import { mockedAllocations } from 'factories/allocatedWorkers';
import { mockedWorker } from 'factories/workers';
import {
  errorFactory,
  mockedAPIerror,
  mockedAPIservererror,
} from 'factories/APIerrors';

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
  it('should render an error if the API returns a 500', async () => {
    jest.spyOn(meAPI, 'useMyData').mockImplementation(() => ({
      data: undefined,
      error: mockedAPIservererror,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));
    const { asFragment, getByText } = render(<MyData />);
    getByText('An unknown error has occurred.');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render nothing when there is no worker for the current user', async () => {
    //arrange - mock null data and an error not found error response
    jest.spyOn(meAPI, 'useMyData').mockImplementation(() => ({
      data: undefined,
      error: mockedAPIerror,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));
    const { asFragment, queryByText } = render(<MyData />);
    expect(queryByText('User not found in the system')).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render a worker's data only if a worker is available", async () => {
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
