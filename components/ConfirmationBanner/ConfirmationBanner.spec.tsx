import { render, screen } from '@testing-library/react';
import ConfirmationBanner from './ConfirmationBanner';

describe('ConfirmationBanner', () => {
  it('renders a title', () => {
    render(<ConfirmationBanner title="Example title" />);
    expect(screen.getByText('Example title'));
  });

  it('renders children, conditionally', () => {
    expect(screen.queryByTestId('confirmation-banner-children')).toBeNull();

    render(
      <ConfirmationBanner title="Example title">
        Example children
      </ConfirmationBanner>
    );
    expect(screen.getByText('Example children'));
  });
});
