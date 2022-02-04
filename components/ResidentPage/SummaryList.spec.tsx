import { render, screen } from '@testing-library/react';

import SummaryList from './SummaryList';

describe('SummaryList', () => {
  it('shows rows of data', () => {
    render(
      <SummaryList
        rows={{
          key: 'value',
          foo: 'bar',
        }}
      />
    );
    expect(screen.getAllByRole('term').length).toBe(2);
    expect(screen.getAllByRole('definition').length).toBe(2);
  });
});
