import { render, screen } from '@testing-library/react';
import ContactTable from './MatchBanner';

describe('#ContactTable', () => {
  beforeEach(() => {
    jest.resetAllMocks;
  });

  render(<ContactTable />);

  it('should render correctly', () => {
    expect(screen.getByText('Potential matches'));
    expect(screen.getByText('Link person'));
  });
});
