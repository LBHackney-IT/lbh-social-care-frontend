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
      restricted: 'N',
    },
  };

  it('should render records properly', async () => {
    getCasesByResident.mockImplementation(() =>
      Promise.resolve({
        cases: [
          {
            caseFormTimestamp: '2020-11-04',
            dateOfBirth: '2020-11-13',
            firstName: 'Ciasom',
            lastName: 'Tesselate',
            personId: '44000000',
            formName: 'Foo_bar',
            recordId: '12345',
            caseFormUrl: 'http//foo/bar',
            officerEmail: 'foo@bar.co.uk',
            dateOfEvent: '2020-12-24',
          },
        ],
        nextCursor: 1,
      })
    );
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
    expect(getAllByText('View')).toHaveLength(1);

    getCasesByResident.mockImplementation(() =>
      Promise.resolve({
        cases: [
          {
            caseFormTimestamp: '2020-12-04',
            dateOfBirth: '2020-12-13',
            firstName: 'Ciasom',
            lastName: 'Tesselate',
            personId: '44000000',
            formName: 'Foo_foo',
            recordId: '12347',
            caseFormUrl: 'http//foo/foo',
            officerEmail: 'foo@foo.co.uk',
            dateOfEvent: '2020-12-23',
          },
        ],
        nextCursor: 1,
      })
    );

    fireEvent.click(button);
    await waitFor(() => {
      expect(getAllByText('View')).toHaveLength(2);
    });
    expect(getCasesByResident).toHaveBeenCalled();
  });

  it('should render no records ', async () => {
    getCasesByResident.mockImplementation(() =>
      Promise.resolve({
        cases: [],
        nextCursor: 1,
      })
    );

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
        firstName: 'Foo',
        lastName: 'Bar',
        mosaicId: '123',
        ageContext: 'A',
        restricted: 'Y',
      },
    };
    getCasesByResident.mockImplementation(() =>
      Promise.resolve({
        cases: [],
        nextCursor: 1,
      })
    );

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

    const title = getByText('RESTRICTED');
    expect(title).toBeInTheDocument();
  });
});
