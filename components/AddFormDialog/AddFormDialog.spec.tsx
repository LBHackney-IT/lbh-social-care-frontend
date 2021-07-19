import AddFormDialog from './AddFormDialog';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import { AuthProvider } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';
import ADULT_GFORMS from 'data/googleForms/adultForms';
import CHILD_GFORMS from 'data/googleForms/childForms';
import flexibleForms from 'data/flexibleForms';

import 'next/router';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { foo: 'bar' },
    replace: jest.fn(),
    pathname: 'foopath',
  }),
}));

describe('AddFormDialog', () => {
  it('shows forms from two sources', () => {
    render(
      <AuthProvider user={mockedUser}>
        <AddFormDialog
          isOpen={true}
          onDismiss={jest.fn()}
          person={mockedResident}
        />
      </AuthProvider>
    );
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(1);
    expect(screen.getAllByRole('link').length).toBeGreaterThan(1);
    expect(screen.getAllByText('System form').length).toBeGreaterThan(1);
    expect(screen.getAllByText('Google form').length).toBeGreaterThan(1);
  });

  it('only shows forms appropriate to the adult service context', () => {
    // adult
    render(
      <AuthProvider user={mockedUser}>
        <AddFormDialog
          isOpen={true}
          onDismiss={jest.fn()}
          person={mockedResident}
        />
      </AuthProvider>
    );
    expect(screen.getByText(ADULT_GFORMS[0].text));
    expect(screen.queryByText(CHILD_GFORMS[0].text)).toBeNull();
  });

  it('only shows forms appropriate to the child service context', () => {
    render(
      <AuthProvider user={mockedUser}>
        <AddFormDialog
          isOpen={true}
          onDismiss={jest.fn()}
          person={{ ...mockedResident, contextFlag: 'C' }}
        />
      </AuthProvider>
    );
    expect(screen.getByText(CHILD_GFORMS[0].text));
    expect(screen.queryByText(ADULT_GFORMS[0].text)).toBeNull();
  });

  it('supports canonical urls', () => {
    render(
      <AuthProvider user={mockedUser}>
        <AddFormDialog
          isOpen={true}
          onDismiss={jest.fn()}
          person={{ ...mockedResident, contextFlag: 'C' }}
        />
      </AuthProvider>
    );
    fireEvent.change(screen.getByLabelText('Search for a form'), {
      target: { value: 'Case note' },
    });
    expect((screen.getByText('Case note') as HTMLLinkElement).href).toContain(
      `/people/1/case-note`
    );
  });

  it('allows searching for a form', () => {
    render(
      <AuthProvider user={mockedUser}>
        <AddFormDialog
          isOpen={true}
          onDismiss={jest.fn()}
          person={mockedResident}
        />
      </AuthProvider>
    );
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(10);
    fireEvent.change(screen.getByLabelText('Search for a form'), {
      target: { value: 'conversation' },
    });
    expect(screen.getAllByRole('listitem').length).toBeLessThan(10);
  });
});
