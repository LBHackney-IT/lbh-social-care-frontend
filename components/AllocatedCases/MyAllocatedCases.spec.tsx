import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser, userFactory } from 'factories/users';
import * as meAPI from 'utils/api/me';
import MyAllocatedCases from './MyAllocatedCases';
import { mockedAllocations } from 'factories/allocatedWorkers';
import { mockedWorker } from 'factories/workers';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock('components/AllocatedCases/AllocatedCasesTable', () => () =>
  'MockedAllocatedCasesTable'
);

describe(`MyAllocatedCases`, () => {
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
    const { findByText, asFragment } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build(),
        }}
      >
        <MyAllocatedCases />
      </UserContext.Provider>
    );
    const allocateTable = await findByText('MockedAllocatedCasesTable');
    expect(allocateTable).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
