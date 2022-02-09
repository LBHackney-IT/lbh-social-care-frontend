import AddFormDialog from './AddFormDialog';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import { AuthProvider } from 'components/UserContext/UserContext';
import {
  mockedUser,
  mockedAdminUser,
  mockedUserInWorkflowsPilot,
} from 'factories/users';
import ADULT_GFORMS from 'data/googleForms/adultForms';
import CHILD_GFORMS from 'data/googleForms/childForms';
import 'data/flexibleForms';
import 'next/router';
import { AppConfigProvider } from 'lib/appConfig';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { foo: 'bar' },
    replace: jest.fn(),
    pathname: 'foopath',
  }),
}));

beforeEach(() => {
  jest.resetModules();
});

describe('AddFormDialog', () => {
  it('shows forms from two sources', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedUser}>
          <AddFormDialog
            isOpen={true}
            onDismiss={jest.fn()}
            person={mockedResident}
          />
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(1);
    expect(screen.getAllByRole('link').length).toBeGreaterThan(1);
    expect(
      screen.getAllByText('System form', { exact: false }).length
    ).toBeGreaterThan(1);
    expect(
      screen.getAllByText('Google form', { exact: false }).length
    ).toBeGreaterThan(1);
  });

  it('only shows forms appropriate to the adult service context', () => {
    // adult
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedUser}>
          <AddFormDialog
            isOpen={true}
            onDismiss={jest.fn()}
            person={mockedResident}
          />
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(screen.getByText(ADULT_GFORMS[0].text));
    expect(screen.queryByText(CHILD_GFORMS[0].text)).toBeNull();
  });

  it('only shows forms appropriate to the child service context', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedUser}>
          <AddFormDialog
            isOpen={true}
            onDismiss={jest.fn()}
            person={{ ...mockedResident, contextFlag: 'C' }}
          />
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(screen.getByText(CHILD_GFORMS[0].text));
    expect(screen.queryByText(ADULT_GFORMS[0].text)).toBeNull();
  });

  it('adds prefill parameters to google forms', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedUser}>
          <AddFormDialog
            isOpen={true}
            onDismiss={jest.fn()}
            person={mockedResident}
          />
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(
      screen
        .getAllByText('Google form', { exact: false })[0]
        .parentElement?.querySelector('a')?.href
    ).toContain(
      '?entry.323945892=1&entry.91559572=Foo&entry.1999530701=Bar&entry.432615953=Foo&entry.809765129=Bar&entry.1802043044=1&entry.787982027=Foo&entry.926422462=Bar&entry.2022397649=1&entry.529016216=foo@bar.com&entry.360061230=foo@bar.com'
    );
  });

  it('supports canonical urls', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedUser}>
          <AddFormDialog
            isOpen={true}
            onDismiss={jest.fn()}
            person={{ ...mockedResident, contextFlag: 'C' }}
          />
        </AuthProvider>
      </AppConfigProvider>
    );
    fireEvent.change(screen.getByLabelText('Search for a form'), {
      target: { value: 'Case note' },
    });
    expect(
      (screen.getAllByText('Case note') as HTMLLinkElement[])[0].href
    ).toContain(`/people/1/case-note`);
  });

  it('allows searching for a form', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedUser}>
          <AddFormDialog
            isOpen={true}
            onDismiss={jest.fn()}
            person={mockedResident}
          />
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(10);
    fireEvent.change(screen.getByLabelText('Search for a form'), {
      target: { value: 'conversation' },
    });
    expect(screen.getAllByRole('listitem').length).toBeLessThan(10);
  });

  it('correctly shows and marks preview forms for users with elevated permissions', () => {
    jest.doMock('data/flexibleForms', () => [
      {
        id: 'bar',
        name: 'bar',
        isViewableByAdults: false,
        isViewableByChildren: false,
      },
    ]);

    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider
          user={{
            ...mockedUser,
            hasAdminPermissions: false,
          }}
        >
          <AddFormDialog
            isOpen={true}
            onDismiss={jest.fn()}
            person={mockedResident}
          />
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(screen.queryAllByText('In preview', { exact: false }).length).toBe(
      0
    );

    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedAdminUser}>
          <AddFormDialog
            isOpen={true}
            onDismiss={jest.fn()}
            person={mockedResident}
          />
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(
      screen.getAllByText('In preview', { exact: false }).length
    ).toBeGreaterThan(0);
  });

  it('displays link for workflows if user is in workflows pilot', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedUserInWorkflowsPilot}>
          <AddFormDialog
            isOpen={true}
            onDismiss={jest.fn()}
            person={mockedResident}
          />
        </AuthProvider>
      </AppConfigProvider>
    );

    expect(screen.queryByText('Workflow or assessment')).toBeVisible();
  });

  it('displays link for workflow at the top if user is in workflows pilot', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedUserInWorkflowsPilot}>
          <AddFormDialog
            isOpen={true}
            onDismiss={jest.fn()}
            person={mockedResident}
          />
        </AuthProvider>
      </AppConfigProvider>
    );

    expect(screen.queryAllByRole('link')[0]).toHaveTextContent(
      'Workflow or assessment'
    );
  });

  it('does not display link for workflows if user is not in workflows pilot', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedUser}>
          <AddFormDialog
            isOpen={true}
            onDismiss={jest.fn()}
            person={mockedResident}
          />
        </AuthProvider>
      </AppConfigProvider>
    );

    expect(
      screen.queryByText('Workflow or assessment')
    ).not.toBeInTheDocument();
  });
});
