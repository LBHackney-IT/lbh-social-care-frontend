import { fireEvent, render, screen } from '@testing-library/react';
import Collapsible from './Collapsible';

describe('Collapsible', () => {
  it('renders its children, link and title', () => {
    render(
      <Collapsible title="foo" link={'testing'}>
        bar
      </Collapsible>
    );

    expect(screen.getByRole('heading'));
    expect(screen.getByText('foo'));
    expect(screen.getByText('bar'));
    expect(screen.getByText('testing'));
  });

  it('can be opened and closed', () => {
    render(<Collapsible title="foo">bar</Collapsible>);

    fireEvent.click(screen.getByText('foo'));
    expect(screen.queryByText('bar')).toBeNull();
    fireEvent.click(screen.getByText('foo'));
    expect(screen.getByText('bar'));
  });
});
