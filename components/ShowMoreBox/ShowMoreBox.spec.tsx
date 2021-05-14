import { render, screen, fireEvent } from '@testing-library/react';

import ShowMoreBox from './ShowMoreBox';

describe('ShowMoreBox', () => {
  it('renders short content fully', () => {
    render(<ShowMoreBox>Show content that will not be truncated</ShowMoreBox>);
    expect(screen.getByText('Show content that will not be truncated'));
  });

  const longContent =
    'Long content that will be truncated long content that will be truncated long content that will be truncated long content that will be truncated long content that will be truncated long content that will be truncated.';

  it('truncates longer content', () => {
    render(<ShowMoreBox>{longContent}</ShowMoreBox>);
    expect(
      screen.getByText(
        'Long content that will be truncated long content that will be truncated long content that will be truncated long content...'
      )
    );
  });

  it('can be expanded', () => {
    render(<ShowMoreBox>{longContent}</ShowMoreBox>);
    fireEvent.click(screen.getByText('Show more'));
    expect(screen.getByText('Show less'));
    expect(screen.getByText(longContent));
  });

  it('preserves newlines when expanded', () => {
    render(<ShowMoreBox>{`${longContent}\n${longContent}`}</ShowMoreBox>);
    expect(screen.queryAllByTestId('para').length).toBe(0);
    fireEvent.click(screen.getByText('Show more'));
    expect(screen.queryAllByTestId('para').length).toBe(2);
  });
});
