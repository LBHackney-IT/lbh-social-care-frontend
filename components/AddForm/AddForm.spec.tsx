import { render, fireEvent, act } from '@testing-library/react';

import AddForm from './AddForm';
import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser, userFactory } from 'factories/users';
import { residentFactory } from 'factories/residents';
import { Form } from 'data/flexibleForms/forms.types';

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

const flexibleForms: Form[] = [
  {
    id: 'foo',
    isViewableByAdults: false,
    isViewableByChildrens: false,
    name: 'Foo',
    steps: [],
  },
  {
    id: 'review-3c',
    isViewableByAdults: true,
    isViewableByChildrens: false,
    name: 'Review of Care and Support Plan (3C)',
    steps: [],
  },
  {
    id: 'FACE overview assessment',
    isViewableByAdults: true,
    isViewableByChildrens: false,
    name: 'FACE overview assessment',
    steps: [],
  },
  {
    id: 'safeguarding-adult-concern-form',
    isViewableByAdults: true,
    isViewableByChildrens: false,
    name: 'Safeguarding Adult Concern Form',
    steps: [],
  },
  {
    groupRecordable: true,
    id: 'child-case-note',
    isViewableByAdults: false,
    isViewableByChildrens: false,
    name: 'Case note',
    steps: [],
  },
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
      'Forms viewed as childrens worker',
      async (form) => {
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

        if (form.isViewableByChildrens) {
          await act(async () => {
            fireEvent.click(getByRole('option', { name: form.name }));
          });
          expect(autocompleteInput.value).toBe(form.name);
        } else {
          console.log('hit');
          expect(queryByRole('option', { name: form.name })).toBeNull();
        }
      }
    );
  });

  test.each(flexibleForms)('Forms viewed as adults worker', async (form) => {
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

    if (form.isViewableByChildrens) {
      await act(async () => {
        fireEvent.click(getByRole('option', { name: form.name }));
      });
      expect(autocompleteInput.value).toBe(form.name);
    } else {
      console.log('hit');
      expect(queryByRole('option', { name: form.name })).toBeNull();
    }
  });
});
