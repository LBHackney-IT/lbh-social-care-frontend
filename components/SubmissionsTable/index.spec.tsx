import { fireEvent, render, screen } from '@testing-library/react';
import { mockSubmission } from 'factories/submissions';
import SubmissionsTable from './index';
import { useAuth } from 'components/UserContext/UserContext';
import { mockedResident } from 'factories/residents';

jest.mock('components/UserContext/UserContext');

(useAuth as jest.Mock).mockReturnValue({
  user: {
    email: 'foo.bar@hackney.gov.uk',
  },
});

describe('SubmissionsTable', () => {
  it('renders correctly when there are no submissions', () => {
    render(<SubmissionsTable submissions={[]} everyoneCount={0} />);
    expect(screen.getByText('Just mine (0)'));
    expect(screen.getByText('Everyone (0)'));
    expect(screen.getByText('No results to show.'));
  });

  it('hides restricted records', () => {
    render(
      <SubmissionsTable
        submissions={[
          {
            ...mockSubmission,
            residents: [
              {
                ...mockedResident,
                restricted: 'Y',
              },
            ],
          },
        ]}
        everyoneCount={0}
      />
    );

    expect(screen.getByText('Just mine (0)'));
    expect(screen.getByText('Everyone (0)'));
    expect(screen.getByText('No results to show.'));
  });

  it('lets you search for a submission by form name', async () => {
    render(
      <SubmissionsTable submissions={[mockSubmission]} everyoneCount={0} />
    );

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'Sandbox form' },
    });
    expect(screen.getByText('Just mine (1)'));
    expect(screen.queryAllByRole('listitem').length).toBe(3);
  });

  it("correctly renders user's own submissions", () => {
    render(
      <SubmissionsTable submissions={[mockSubmission]} everyoneCount={1} />
    );

    fireEvent.click(screen.getByText('Just mine (1)'));
    expect(screen.queryAllByRole('listitem').length).toBe(3);
    fireEvent.click(screen.getByText('Everyone (1)'));
    expect(screen.queryAllByRole('listitem').length).toBe(3);
  });

  it("correctly renders another user's submissions", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        email: 'test@user.com',
      },
    });

    render(
      <SubmissionsTable submissions={[mockSubmission]} everyoneCount={1} />
    );

    fireEvent.click(screen.getByText('Just mine (0)'));
    expect(screen.getByText('No results to show.'));
    fireEvent.click(screen.getByText('Everyone (1)'));
    expect(screen.queryAllByRole('listitem').length).toBe(3);
  });
});
