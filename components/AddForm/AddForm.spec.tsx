import { render, fireEvent, act } from '@testing-library/react';

import AddForm from './AddForm';
import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser, userFactory } from 'factories/users';
import { residentFactory } from 'factories/residents';

jest.mock('data/googleForms/adultForms', () => [
  {
    text: 'Foo - Adult',
    value: 'https://foo.com',
    category: 'General',
    id: 'foo_adult',
  },
  {
    text: 'Bar - Adult',
    value: 'https://foo.com',
    category: 'General',
  },
]);

jest.mock('data/googleForms/childForms', () => [
  {
    text: 'Foo - Child',
    value: 'https://foo.com',
    category: 'General',
  },
  {
    text: 'Bar - Child',
    value: 'https://foo.com',
    category: 'General',
  },
]);

// [formName, isViewableByAdults, isViewableByChildrens]
const flexibleForms: [string, boolean, boolean][] = [
  ['Foo', false, false],
  ['Review of Care and Support Plan (3C)', true, false],
  ['FACE overview assessment', true, false],
  ['Safeguarding Adult Concern Form', true, false],
  ['Child Case Note', false, false],
];

describe('AddForm component', () => {
  it('should render adult forms', async () => {
    const props = {
      person: residentFactory.build({ contextFlag: 'A' }),
    };
    const { getByTestId, getByRole } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <AddForm {...props} />
      </UserContext.Provider>
    );

    const autocompleteInput = getByTestId('formList') as HTMLInputElement;

    expect(autocompleteInput).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(autocompleteInput);
    });
    expect(getByRole('option', { name: 'Case Note Recording' })).toBeDefined();

    await act(async () => {
      fireEvent.click(getByRole('option', { name: 'Bar - Adult' }));
    });
    expect(autocompleteInput.value).toBe('Bar - Adult');
  });

  it('should render children forms', async () => {
    const props = {
      person: residentFactory.build({ contextFlag: 'C' }),
    };
    const { getByRole, getByTestId, asFragment } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: false,
            hasDevPermissions: false,
            hasUnrestrictedPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: true,
          }),
        }}
      >
        <AddForm {...props} />
      </UserContext.Provider>
    );

    const autocompleteInput = getByTestId('formList') as HTMLInputElement;

    expect(autocompleteInput).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(autocompleteInput);
    });
    expect(asFragment()).toMatchSnapshot();

    await act(async () => {
      fireEvent.click(getByRole('option', { name: 'Foo - Child' }));
    });
    expect(autocompleteInput.value).toBe('Foo - Child');
  });

  it('should render Warning Note for an adults user', async () => {
    const props = {
      person: residentFactory.build({ contextFlag: 'A' }),
    };
    const { getByRole, getByTestId } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: false,
            hasDevPermissions: false,
            hasUnrestrictedPermissions: false,
            hasAdultPermissions: true,
            hasChildrenPermissions: false,
          }),
        }}
      >
        <AddForm {...props} />
      </UserContext.Provider>
    );

    const autocompleteInput = getByTestId('formList') as HTMLInputElement;

    await act(async () => {
      fireEvent.click(autocompleteInput);
    });
    await act(async () => {
      fireEvent.click(getByRole('option', { name: 'Warning Note' }));
    });
    expect(autocompleteInput.value).toBe('Warning Note');
  });

  it('should render Warning Note for a childrens user', async () => {
    const props = {
      person: residentFactory.build({ contextFlag: 'C' }),
    };
    const { getByRole, getByTestId } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: false,
            hasDevPermissions: false,
            hasUnrestrictedPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: true,
          }),
        }}
      >
        <AddForm {...props} />
      </UserContext.Provider>
    );

    const autocompleteInput = getByTestId('formList') as HTMLInputElement;

    await act(async () => {
      fireEvent.click(autocompleteInput);
    });
    await act(async () => {
      fireEvent.click(getByRole('option', { name: 'Warning Note' }));
    });
    expect(autocompleteInput.value).toBe('Warning Note');
  });

  describe('displaying of flexible forms', () => {
    test.each(flexibleForms)(
      `Form %s viewed as childrens worker should display correctly`,
      async (formName, _, isViewableByChildrens) => {
        const props = {
          person: residentFactory.build({ contextFlag: 'C' }),
        };
        const { getByRole, getByTestId, queryByRole } = render(
          <UserContext.Provider
            value={{
              user: userFactory.build({
                hasAdminPermissions: false,
                hasDevPermissions: false,
                hasUnrestrictedPermissions: false,
                hasAdultPermissions: false,
                hasChildrenPermissions: true,
              }),
            }}
          >
            <AddForm {...props} />
          </UserContext.Provider>
        );

        const autocompleteInput = getByTestId('formList') as HTMLInputElement;

        await act(async () => {
          fireEvent.click(autocompleteInput);
        });

        if (isViewableByChildrens) {
          await act(async () => {
            fireEvent.click(getByRole('option', { name: formName as string }));
          });
          expect(autocompleteInput.value).toBe(formName);
        } else {
          expect(
            queryByRole('option', { name: formName as string })
          ).toBeNull();
        }
      }
    );
  });

  test.each(flexibleForms)(
    `Form %s viewed as adults worker should display correctly`,
    async (formName, isViewableByAdults) => {
      const props = {
        person: residentFactory.build({ contextFlag: 'A' }),
      };
      const { getByRole, getByTestId, queryByRole } = render(
        <UserContext.Provider
          value={{
            user: userFactory.build({
              hasAdminPermissions: false,
              hasDevPermissions: false,
              hasUnrestrictedPermissions: false,
              hasAdultPermissions: true,
              hasChildrenPermissions: false,
            }),
          }}
        >
          <AddForm {...props} />
        </UserContext.Provider>
      );

      const autocompleteInput = getByTestId('formList') as HTMLInputElement;

      await act(async () => {
        fireEvent.click(autocompleteInput);
      });

      if (isViewableByAdults) {
        await act(async () => {
          fireEvent.click(getByRole('option', { name: formName }));
        });
        expect(autocompleteInput.value).toBe(formName);
      } else {
        expect(queryByRole('option', { name: formName })).toBeNull();
      }
    }
  );

  test.each(flexibleForms)(
    `Form %s always displayed on staging if user is admin or dev`,
    async (formName) => {
      const props = {
        person: residentFactory.build({ contextFlag: 'A' }),
      };
      const { getByRole, getByTestId } = render(
        <UserContext.Provider
          value={{
            user: userFactory.build({
              hasAdminPermissions: true,
              hasDevPermissions: true,
              hasUnrestrictedPermissions: false,
              hasAdultPermissions: true,
              hasChildrenPermissions: false,
            }),
          }}
        >
          <AddForm {...props} />
        </UserContext.Provider>
      );

      const autocompleteInput = getByTestId('formList') as HTMLInputElement;

      await act(async () => {
        fireEvent.click(autocompleteInput);
      });

      await act(async () => {
        fireEvent.click(getByRole('option', { name: formName }));
      });
      expect(autocompleteInput.value).toBe(formName);
    }
  );
});
