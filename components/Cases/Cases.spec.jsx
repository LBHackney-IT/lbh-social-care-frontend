import { render, waitFor, fireEvent } from '@testing-library/react';

import { useCasesByResident } from 'utils/api/cases';
import { UserContext } from 'components/UserContext/UserContext';

import Cases from './Cases';

jest.mock('utils/api/cases', () => ({
  useCasesByResident: jest.fn(),
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
    useCasesByResident.mockImplementation(() => ({
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
          user: { hasAdminPermissions: true },
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
    useCasesByResident.mockImplementation(() => ({
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
          user: { hasAdminPermissions: true },
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
    const label = getByText('Records not found');
    expect(label).toBeInTheDocument();
  });

  it('should render a error message when a person is restricted', async () => {
    const props = {
      id: '44000000',
      person: {
        restricted: true,
      },
    };
    const { asFragment, getByText } = render(
      <UserContext.Provider
        value={{
          user: { hasAdminPermissions: true },
        }}
      >
        <Cases {...props} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(useCasesByResident).not.toHaveBeenCalled();
    const title = getByText('RESTRICTED');
    expect(title).toBeInTheDocument();
  });
});
