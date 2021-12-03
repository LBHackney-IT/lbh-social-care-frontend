import { render, screen } from '@testing-library/react';
import MashPriorityBanner from './MashPriorityBanner';

describe('#FinalDecisionForm', () => {
  const testChildHtml = 'this is the test child html';

  it('should render correctly when there is a priority', () => {
    render(
      <MashPriorityBanner isPriority={true}>{testChildHtml}</MashPriorityBanner>
    );

    expect(screen.getByText(testChildHtml));
    expect(screen.getByText('High priority'));
  });

  it('should render correctly when there is not a priority', () => {
    render(
      <MashPriorityBanner isPriority={false}>
        {testChildHtml}
      </MashPriorityBanner>
    );

    expect(screen.getByText(testChildHtml));
    expect(screen.queryByText('High priority')).toBeNull();
  });
});
