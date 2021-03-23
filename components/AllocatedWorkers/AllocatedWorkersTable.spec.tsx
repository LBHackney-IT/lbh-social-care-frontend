import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import AllocatedWorkersTable, { Props } from './AllocatedWorkersTable';
import { mockedAllocations } from 'factories/allocatedWorkers';
import { mockedUser } from 'factories/users';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
  }),
}));

describe('AllocatedWorkers component', () => {
  const props: Props = {
    records: mockedAllocations,
    hasAllocationsPermissions: false,
  };

  it('should render properly', () => {
    const { asFragment } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <AllocatedWorkersTable {...props} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly - with deallocate button', () => {
    const { asFragment } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <AllocatedWorkersTable {...props} hasAllocationsPermissions={true} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
