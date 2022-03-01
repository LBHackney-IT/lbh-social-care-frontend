import { render, screen } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import { AppConfigProvider } from 'lib/appConfig';
import Layout from './Layout';
import { useAuth } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';
import { useRouter } from 'next/router';

jest.mock('components/UserContext/UserContext');
jest.mock('next/router');

(useAuth as jest.Mock).mockReturnValue({ user: mockedUser });
(useRouter as jest.Mock).mockReturnValue({ asPath: '' });

describe('Layout', () => {
  it('renders children', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <Layout resident={mockedResident}>testing</Layout>
      </AppConfigProvider>
    );
    expect(screen.getByText('testing'));
  });

  it('shows basic resident biographical info', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <Layout resident={mockedResident}>testing</Layout>
      </AppConfigProvider>
    );
    expect(screen.getByText('Foo Bar'));
    expect(
      screen.getByText('#1 · Born 13 Nov 2020 · sjakdjlk, hdsadjk', {
        exact: false,
      })
    );
  });

  it('shows nav', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <Layout resident={mockedResident}>testing</Layout>
      </AppConfigProvider>
    );
    expect(screen.getAllByRole('navigation').length).toBe(1);
    expect(screen.getByText('Overview'));
    expect(screen.getByText('Workflows'));
    expect(screen.getByText('Case notes & records'));
    expect(screen.getByText('Allocations'));
    expect(screen.getByText('Relationships'));
  });

  it('shows case statuses', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <Layout resident={mockedResident}>testing</Layout>
      </AppConfigProvider>
    );
    expect(screen.getAllByRole('list').length).toBe(3);
    expect(screen.getAllByRole('listitem').length).toBe(8);
    expect(screen.getByText('Adult social care'));
  });
});
