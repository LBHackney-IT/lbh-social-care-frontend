import { render, screen } from '@testing-library/react';
import MashPriorityBanner from './MashPriorityBanner';

describe('MashPriorityBanner', () => {
  const testChildHtml = 'this is the test child html';

  it('displays that it is a high priority if it is a priority', () => {
    render(
      <MashPriorityBanner isPriority={true}>{testChildHtml}</MashPriorityBanner>
    );

    expect(screen.getByText(testChildHtml));
    expect(screen.getByText('High priority'));
  });

  it('does not display high priority if it is not a priority', () => {
    render(
      <MashPriorityBanner isPriority={false}>
        {testChildHtml}
      </MashPriorityBanner>
    );

    expect(screen.getByText(testChildHtml));
    expect(screen.queryByText('High priority')).toBeNull();
  });
});
