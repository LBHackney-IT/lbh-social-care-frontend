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
    expect(screen.getAllByText('term').length).toBe(2);
    expect(screen.getAllByText('definition').length).toBe(2);
  });
});
