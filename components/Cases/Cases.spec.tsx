import { render, waitFor, fireEvent } from '@testing-library/react';

import * as casesAPI from 'utils/api/cases';
import { UserContext } from 'components/UserContext/UserContext';
import { userFactory } from 'factories/users';

import { mockedNote, mockedAllocationNote } from 'factories/cases';
import { residentFactory } from 'factories/residents';

import Cases from './Cases';

describe('Cases component', () => {
  const props = {
    id: 44000000,
    person: residentFactory.build(),
  };

  it('should render records properly', async () => {
    const mockSetSize = jest.fn();
    jest.spyOn(casesAPI, 'useCasesByResident').mockImplementation(() => ({
      size: 2,
      setSize: mockSetSize,
      data: [
        {
          cases: [mockedNote],
          nextCursor: 1,
        },
        {
          cases: [mockedAllocationNote],
          nextCursor: 2,
        },
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    const { asFragment, getByRole, getAllByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build(),
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
    const button = getByRole('button', { name: 'load more' });
    expect(getAllByText('View')).toHaveLength(2);
    fireEvent.click(button);
    expect(mockSetSize).toHaveBeenCalled();
    expect(mockSetSize).toHaveBeenCalledWith(3);
  });

  it('should render no records ', async () => {
    jest.spyOn(casesAPI, 'useCasesByResident').mockImplementation(() => ({
      size: 0,
      data: [
        {
          cases: [],
          nextCursor: 1,
        },
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
      setSize: jest.fn(),
    }));
    const { asFragment, getByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build(),
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('Records not found')).toBeInTheDocument();
  });

  it('should render a error message when a person is restricted', async () => {
    const props = {
      id: 44000000,
      person: residentFactory.build({
        restricted: 'Y',
      }),
    };
    const { asFragment, queryByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build(),
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(casesAPI.useCasesByResident).not.toHaveBeenCalled();
    expect(queryByText('RESTRICTED')).toBeInTheDocument();
  });

  it('should work properly if person is restricted but user.hasUnrestrictedPermissions', async () => {
    const props = {
      id: 44000000,
      person: residentFactory.build({
        restricted: 'Y',
      }),
    };
    const { asFragment, queryByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasUnrestrictedPermissions: true,
          }),
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(casesAPI.useCasesByResident).toHaveBeenCalled();
    expect(queryByText('RESTRICTED')).not.toBeInTheDocument();
  });

  it('should render the cases if the user is of the same context type as the resident', () => {
    const props = {
      id: 44000000,
      person: residentFactory.build({
        contextFlag: 'A',
        restricted: 'N',
      }),
    };

    const { queryByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasUnrestrictedPermissions: false,
            hasChildrenPermissions: false,
            hasAdultPermissions: true,
          }),
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );

    expect(queryByText('RESTRICTED')).not.toBeInTheDocument();
  });

  it('should restrict the cases if the user is not of the same context type as the resident', () => {
    const props = {
      id: 44000000,
      person: residentFactory.build({
        contextFlag: 'C',
        restricted: 'N',
      }),
    };

    const { getByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: false,
            hasUnrestrictedPermissions: false,
            hasChildrenPermissions: false,
            hasAdultPermissions: true,
          }),
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );

    getByText('RESTRICTED');
  });
});
