import { render, screen } from '@testing-library/react';
import { AuthProvider } from 'components/UserContext/UserContext';
import { mockedResident } from 'factories/residents';
import { mockedOnlyChildUser, mockedUser } from 'factories/users';
import Layout from './Layout';
import 'next/router';

const mockedUseRouter = {
  query: { foo: 'bar' },
  replace: jest.fn(),
  pathname: 'foopath',
};

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

describe('Layout', () => {
  it('renders children, navigation and a primary action', () => {
    render(
      <AuthProvider user={mockedUser}>
        <Layout person={mockedResident}>Foo</Layout>
      </AuthProvider>
    );
    expect(screen.getByText('Foo'));
    expect(screen.getByText('Add something new'));
    expect(screen.getByRole('navigation'));
    expect(screen.getByText('Timeline'));
  });

  it("renders the user's name and caption", () => {
    render(
      <AuthProvider user={mockedUser}>
        <Layout person={mockedResident}>Foo</Layout>
      </AuthProvider>
    );
    expect(screen.getByText('Foo Bar'));
    expect(screen.getByText('#1 · Born 13 Nov 2020'));
  });

  it("hides the timeline link if the user isn't authorised", () => {
    render(
      <AuthProvider user={mockedOnlyChildUser}>
        <Layout person={mockedResident}>Foo</Layout>
      </AuthProvider>
    );
    expect(screen.queryByText('Timeline')).toBe(null);
  });
});
