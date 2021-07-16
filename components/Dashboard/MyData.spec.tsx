import { render } from '@testing-library/react';
import { mockedUser } from 'factories/users';
import * as meAPI from 'utils/api/me';
import MyData from './MyData';
import { mockedAllocations } from 'factories/allocatedWorkers';
import { mockedWorker } from 'factories/workers';
import { mockedAPIerror, mockedAPIservererror } from 'factories/APIerrors';

describe(`MyData`, () => {
  it('should render nothing if the API returns a 500', async () => {
    jest.spyOn(meAPI, 'useMyData').mockImplementation(() => ({
      data: undefined,
      error: mockedAPIservererror,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));
    const { asFragment } = render(<MyData />);
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
    const { asFragment } = render(<MyData />);
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
    const { asFragment } = render(<MyData />);
    expect(asFragment()).toMatchSnapshot();
  });
});
