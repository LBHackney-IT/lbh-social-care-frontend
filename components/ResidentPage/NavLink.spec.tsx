import { render, screen } from '@testing-library/react';
import NavLink from './NavLink';
import { useRouter } from 'next/router';

jest.mock('next/router');

(useRouter as jest.Mock).mockReturnValue({
  asPath: '/foo',
});

describe('NavLink', () => {
  it('renders a functional link', () => {
    render(<NavLink href="/foo">Foo</NavLink>);
    expect((screen.getByText('Foo') as HTMLAnchorElement).href).toContain(
      '/foo'
    );
  });

  it('looks different when active', () => {
    render(<NavLink href="/foo">Foo</NavLink>);
    expect((screen.getByText('Foo') as HTMLAnchorElement).classList[2]).toBe(
      'navLinkActive'
    );
  });
});
