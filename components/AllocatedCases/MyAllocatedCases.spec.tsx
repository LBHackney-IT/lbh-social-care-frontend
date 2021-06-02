import { render } from '@testing-library/react';

import { mockedUser } from 'factories/users';
import * as meAPI from 'utils/api/me';
import MyAllocatedCases from './MyAllocatedCases';
import { mockedAllocations } from 'factories/allocatedWorkers';
import { mockedWorker } from 'factories/workers';
import { mockedAPIerror, mockedAPIservererror } from 'factories/APIerrors';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock(
  'components/AllocatedCases/AllocatedCasesTable',
  () => () => 'MockedAllocatedCasesTable'
);

describe(`MyAllocatedCases`, () => {
  it('should render an error if the API returns a 500', async () => {
    jest.spyOn(meAPI, 'useMyData').mockImplementation(() => ({
      data: undefined,
      error: mockedAPIservererror,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));
    const { asFragment, getByText } = render(<MyAllocatedCases />);
    getByText('Oops an error occurred');
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render a message when there is no worker for the current user', async () => {
    //arrange - mock null data and an error not found error response
    jest.spyOn(meAPI, 'useMyData').mockImplementation(() => ({
      data: undefined,
      error: mockedAPIerror,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));
    const { asFragment, getByText } = render(<MyAllocatedCases />);
    getByText('No people are assigned to you');
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render properly', async () => {
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
    const { findByText, asFragment } = render(<MyAllocatedCases />);
    const allocateTable = await findByText('MockedAllocatedCasesTable');
    expect(allocateTable).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
