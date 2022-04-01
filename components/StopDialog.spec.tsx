import { render, screen, fireEvent } from '@testing-library/react';
import StopDialog from './StopDialog';

describe('StopDialog component', () => {
  it('displays the dialog ', () => {
    render(<StopDialog />);

    expect(screen.getByText("You shouldn't make edits here any more"));
  });

  it("hides the dialog after they've clicked okay", () => {
    render(<StopDialog />);

    fireEvent.click(screen.getByRole('button'));

    expect(
      screen.queryByText("You shouldn't make edits here any more")
    ).toBeNull();
  });
});
