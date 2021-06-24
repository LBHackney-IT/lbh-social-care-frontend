import { fireEvent, render, screen } from '@testing-library/react';
import { mockSubmission } from 'factories/submissions';
import SubmissionsTable from './index';
import { useAuth } from 'components/UserContext/UserContext';

jest.mock('components/UserContext/UserContext');

(useAuth as jest.Mock).mockReturnValue({
  user: {
    email: 'foo@bar.com',
  },
});

describe('SubmissionsTable', () => {
  it('renders correctly when there are no submissions', () => {
    render(<SubmissionsTable submissions={[]} />);
    expect(screen.queryAllByRole('listitem').length).toBe(0);
    expect(screen.getByText('No unfinished submissions to show'));
  });

  it("correctly renders user's own submissions", () => {
    render(<SubmissionsTable submissions={[mockSubmission]} />);

    expect(screen.queryAllByRole('listitem').length).toBe(1);
    expect(
      (screen.getByLabelText('Just mine') as HTMLInputElement).checked
    ).toBeTruthy();
    fireEvent.click(screen.getByLabelText('All'));
    expect(screen.queryAllByRole('listitem').length).toBe(1);
  });

  it("correctly renders another user's submissions", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        email: 'test@user.com',
      },
    });

    render(<SubmissionsTable submissions={[mockSubmission]} />);

    expect(screen.queryAllByRole('listitem').length).toBe(0);
    fireEvent.click(screen.getByLabelText('All'));
    expect(screen.queryAllByRole('listitem').length).toBe(1);
  });
});
