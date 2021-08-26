import { render, waitFor } from '@testing-library/react';
import PersonView from './PersonView';
import * as residentsAPI from 'utils/api/residents';
import { mockedResident } from 'factories/residents';
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
    const { getByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build(),
        }}
      >
        <PersonView {...props} />
      </UserContext.Provider>
    );
    await waitFor(() => {
      expect(
        getByText('Born 13 Nov 2020', { exact: false })
      ).toBeInTheDocument();
    });
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
});
