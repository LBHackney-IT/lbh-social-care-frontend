import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { residentFactory } from 'factories/residents';
import AddRelationshipForm from './AddRelationshipForm';
import PersonView from '../../../../PersonView/PersonView';
import { AuthProvider } from '../../../../UserContext/UserContext';
import { mockedUser } from '../../../../../factories/users';
import { createMockedPersonView } from '../../../../../test/helpers';

jest.mock('../../../../PersonView/PersonView');
jest.mock('next/router', () => ({
  __esModule: true,
  default: {
    events: {
      on: jest.fn(),
    },
    push: jest.fn(),
  },
  useRouter: () => ({
    query: { foo: 'bar' },
    replace: jest.fn(),
    pathname: 'foopath',
  }),
}));

const mockedResident = residentFactory.build();
const mockedOtherResident = residentFactory.build();

describe('<AddRelationshipForm />', () => {
  beforeEach(() => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddRelationshipForm
          personId={mockedResident.id}
          secondPersonId={mockedOtherResident.id}
        />
      </AuthProvider>
    );
  });

  describe('Relationship types', () => {
    it('sorts by alphabetical order', async () => {
      const dropdown = screen.getByRole('combobox', {
        name: /Relationship type/,
      });
      const dropdownOptions = dropdown.childNodes;

      expect(dropdownOptions[1]).toHaveValue('acquaintance');
      expect(dropdownOptions[2]).toHaveValue('auntUncle');
      expect(dropdownOptions[3]).toHaveValue('child');
    });
  });

  describe('Relationship additional options', () => {
    it('does not show if placeholder', async () => {
      await waitFor(() => {
        userEvent.selectOptions(
          screen.getByRole('combobox', { name: /Relationship type/ }),
          [screen.getByRole('option', { name: /Relationship type/ })]
        );
      });

      const typeOptions = screen.queryByText(/Select all that apply/);

      expect(typeOptions).toBeNull();
    });

    it('does not show if unborn child', async () => {
      await waitFor(() => {
        userEvent.selectOptions(
          screen.getByRole('combobox', { name: /Relationship type/ }),
          [screen.getByText('Unborn child')]
        );
      });

      const typeOptions = screen.queryByText(/Select all that apply/);

      expect(typeOptions).toBeNull();
    });

    it('does not show if unborn sibling', async () => {
      await waitFor(() => {
        userEvent.selectOptions(
          screen.getByRole('combobox', { name: /Relationship type/ }),
          [screen.getByText('Unborn sibling')]
        );
      });

      const typeOptions = screen.queryByText(/Select all that apply/);

      expect(typeOptions).toBeNull();
    });

    it('shows "Parent of an unborn child" option if parent chosen', async () => {
      userEvent.selectOptions(
        screen.getByRole('combobox', { name: /Relationship type/ }),
        [screen.getByText('Parent')]
      );

      expect(screen.getByText(/Parent of an unborn child/)).toBeInTheDocument();
    });

    it('shows "Sibling of an unborn child" option if sibling chosen', async () => {
      userEvent.selectOptions(
        screen.getByRole('combobox', { name: /Relationship type/ }),
        [screen.getByText('Sibling')]
      );

      expect(
        screen.getByText(/Sibling of an unborn child/)
      ).toBeInTheDocument();
    });
  });
});
