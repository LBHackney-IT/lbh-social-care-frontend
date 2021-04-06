import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { userFactory } from 'factories/users';
import * as allocatedWorkersAPI from 'utils/api/allocatedWorkers';
import { mockedAllocations } from 'factories/allocatedWorkers';
import MyAllocatedCases from './MyAllocatedCases';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock('components/AllocatedCases/AllocatedCasesTable', () => () =>
  'MockedAllocatedCasesTable'
);

describe(`MyAllocatedCases`, () => {
  jest
    .spyOn(allocatedWorkersAPI, 'useMyAllocations')
    .mockImplementation(() => ({
      data: {
        allocations: mockedAllocations,
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
