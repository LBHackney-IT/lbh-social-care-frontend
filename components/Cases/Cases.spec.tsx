import { render, waitFor, fireEvent } from '@testing-library/react';

import * as casesAPI from 'utils/api/cases';
import { UserContext } from 'components/UserContext/UserContext';

import { mockedNote, mockedAllocationNote } from 'fixtures/cases.fixtures';
import { mockedResident } from 'fixtures/resident.fixtures';

import Cases from './Cases';

// jest.mock('utils/api/cases', () => ({
//   useCasesByResident: jest.fn(),
// }));

describe('Cases component', () => {
  const props = {
    id: 44000000,
    person: mockedResident,
  };

  it('should render records properly', async () => {
    const mockSetSize = jest.fn();
    jest.spyOn(casesAPI, 'useCasesByResident').mockImplementation(() => ({
      size: 2,
      setSize: mockSetSize,
      data: [
        {
          cases: [
            {
              caseFormTimestamp: '2020-12-04',
              dateOfBirth: '2020-12-13',
              firstName: 'foo',
              lastName: 'FOO',
              personId: 44000001,
              formName: 'Foo_foo',
              recordId: '12347',
              caseFormUrl: 'http//foo/foo',
              officerEmail: 'foo@foo.co.uk',
              dateOfEvent: '2020-12-23',
              caseFormData: mockedNote.caseFormData,
            },
          ],
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
          user: {
            name: 'foo',
            hasAdminPermissions: true,
            hasChildrenPermissions: true,
            hasAdultPermissions: true,
            email: 'foo@bar.com',
            permissionFlag: 'A',
            isAuthorised: true,
          },
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
          user: {
            name: 'foo',
            hasAdminPermissions: true,
            hasChildrenPermissions: true,
            hasAdultPermissions: true,
            email: 'foo@bar.com',
            permissionFlag: 'A',
            isAuthorised: true,
          },
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
      person: {
        ...mockedResident,
        restricted: true,
      },
    };
    const { asFragment, queryByText } = render(
      <UserContext.Provider
        value={{
          user: {
            name: 'foo',
            hasAdminPermissions: true,
            hasChildrenPermissions: true,
            hasAdultPermissions: true,
            email: 'foo@bar.com',
            permissionFlag: 'A',
            isAuthorised: true,
          },
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
      person: {
        ...mockedResident,
        restricted: true,
      },
    };
    const { asFragment, queryByText } = render(
      <UserContext.Provider
        value={{
          user: {
            name: 'foo',
            hasAdminPermissions: true,
            hasChildrenPermissions: true,
            hasAdultPermissions: true,
            email: 'foo@bar.com',
            permissionFlag: 'A',
            isAuthorised: true,
            hasUnrestrictedPermissions: true,
          },
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(casesAPI.useCasesByResident).toHaveBeenCalled();
    expect(queryByText('RESTRICTED')).not.toBeInTheDocument();
  });
});
