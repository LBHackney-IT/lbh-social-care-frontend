import { render, waitFor, fireEvent } from '@testing-library/react';

import { getCasesByResident } from 'utils/api/cases';
import { UserContext } from 'components/UserContext/UserContext';

import Cases from './Cases';

jest.mock('utils/api/cases', () => ({
  getCasesByResident: jest.fn(),
}));

describe('Cases component', () => {
  const props = {
    id: '44000000',
    person: {
      firstName: 'Foo',
      lastName: 'Bar',
      mosaicId: '123',
      ageContext: 'A',
    },
  };

  it('should render records properly', async () => {
    const mockSetSize = jest.fn();
    getCasesByResident.mockImplementation(() => ({
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
              personId: '44000001',
              formName: 'Foo_foo',
              recordId: '12347',
              caseFormUrl: 'http//foo/foo',
              officerEmail: 'foo@foo.co.uk',
              dateOfEvent: '2020-12-23',
              caseFormData: { form_name_overall: 'foo' },
            },
          ],
          nextCursor: 1,
        },
        {
          cases: [
            {
              caseFormTimestamp: '2020-12-04',
              dateOfBirth: '2020-12-13',
              firstName: 'bar',
              lastName: 'BAR',
              personId: '44000001',
              formName: 'Bar_bar',
              recordId: '12345',
              caseFormUrl: 'http//bar/bar',
              officerEmail: 'bar@bar.co.uk',
              caseFormData: { form_name_overall: 'foo' },
            },
          ],
          nextCursor: 2,
        },
      ],
    }));
    const { asFragment, getByRole, getAllByText } = render(
      <UserContext.Provider
        value={{
          user: {},
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
    getCasesByResident.mockImplementation(() => ({
      size: 0,
      data: [
        {
          cases: [],
          nextCursor: 1,
        },
      ],
    }));
    const { asFragment, getByText } = render(
      <UserContext.Provider
        value={{
          user: {},
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
    expect(getByText('Records not found')).toBeInTheDocument();
  });

  it('should render a error message when a person is restricted', async () => {
    const props = {
      id: '44000000',
      person: {
        restricted: true,
      },
    };
    const { asFragment, queryByText } = render(
      <UserContext.Provider
        value={{
          user: {},
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getCasesByResident).not.toHaveBeenCalled();
    expect(queryByText('RESTRICTED')).toBeInTheDocument();
  });

  it('should work properly if person is restricted but user.hasUnrestrictedPermissions', async () => {
    const props = {
      id: '44000000',
      person: {
        restricted: true,
      },
    };
    const { asFragment, queryByText } = render(
      <UserContext.Provider
        value={{
          user: { hasUnrestrictedPermissions: true },
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getCasesByResident).toHaveBeenCalled();
    expect(queryByText('RESTRICTED')).not.toBeInTheDocument();
  });
});
