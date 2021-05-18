import { render, waitFor } from '@testing-library/react';
import PersonView from './PersonView';
import * as residentsAPI from 'utils/api/residents';
import { mockedResident, residentFactory } from 'factories/residents';
import { userFactory } from '../../factories/users';
import { UserContext } from '../UserContext/UserContext';

describe('PersonView component', () => {
  jest.spyOn(residentsAPI, 'useResident').mockImplementation(() => ({
    data: mockedResident,
    isValidating: false,
    mutate: jest.fn(),
    revalidate: jest.fn(),
  }));

  const props = {
    personId: 44000000,
    expandView: false,
  };

  it('should render properly', async () => {
    const { getByText, queryByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build(),
        }}
      >
        <PersonView {...props} />
      </UserContext.Provider>
    );
    await waitFor(() => {
      expect(getByText('13/11/2020')).toBeInTheDocument();
    });
    expect(queryByText('Expand view')).not.toBeInTheDocument();
  });

  it('should render person view', async () => {
    const { getByText, queryByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build(),
        }}
      >
        <PersonView {...props} expandView={true} />
      </UserContext.Provider>
    );
    await waitFor(() => {
      expect(getByText('Expand view')).toBeInTheDocument();
    });
    expect(queryByText('13/11/2020')).not.toBeInTheDocument();
  });

  it('should render properly with node children', async () => {
    const { findByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build(),
        }}
      >
        <PersonView {...props}>foo</PersonView>
      </UserContext.Provider>
    );
    const children = await findByText('foo');
    expect(children).toBeDefined();
  });

  it('should render properly with func children', async () => {
    const { findByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build(),
        }}
      >
        <PersonView {...props}>
          {(person) => `foo${person.firstName}`}
        </PersonView>
      </UserContext.Provider>
    );
    const children = await findByText('fooFoo');
    expect(children).toBeDefined();
  });

  it('should render the "Edit" button if the current user is of the same type as the resident – childrens group only', async () => {
    jest.spyOn(residentsAPI, 'useResident').mockImplementation(() => ({
      data: residentFactory.build({
        contextFlag: 'C',
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { getByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: false,
            hasChildrenPermissions: true,
            hasAdultPermissions: false,
          }),
        }}
      >
        <PersonView {...props} />
      </UserContext.Provider>
    );

    getByText('Update person');
  });

  it('should not render the "Edit" button if the resident is an Adult – awaiting sign off from ASC', async () => {
    jest.spyOn(residentsAPI, 'useResident').mockImplementation(() => ({
      data: residentFactory.build({
        contextFlag: 'A',
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: true,
            hasChildrenPermissions: false,
          }),
        }}
      >
        <PersonView {...props} />
      </UserContext.Provider>
    );

    expect(queryByText('Update person')).toBeNull();
  });

  it('should not render the "Edit" button if the current user is of a different type to the resident', async () => {
    jest.spyOn(residentsAPI, 'useResident').mockImplementation(() => ({
      data: residentFactory.build({
        contextFlag: 'C',
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: true,
            hasChildrenPermissions: false,
          }),
        }}
      >
        <PersonView {...props} />
      </UserContext.Provider>
    );

    expect(queryByText('Update person')).toBeNull();
  });

  it('should not render the "Edit" button if the current user is of the same context type as the resident, but the resident is restricted and the user does not have unrestricted access', async () => {
    jest.spyOn(residentsAPI, 'useResident').mockImplementation(() => ({
      data: residentFactory.build({
        contextFlag: 'C',
        restricted: 'Y',
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: true,
            hasUnrestrictedPermissions: false,
          }),
        }}
      >
        <PersonView {...props} />
      </UserContext.Provider>
    );

    expect(queryByText('Update person')).toBeNull();
  });
});
