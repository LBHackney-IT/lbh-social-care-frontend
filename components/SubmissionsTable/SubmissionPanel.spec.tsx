import { fireEvent, render, screen } from '@testing-library/react';
import { mockSubmission } from 'factories/submissions';
import { mockedUser } from 'factories/users';
import SubmissionPanel from './SubmissionPanel';

describe('SearchBox', () => {
  it('renders correctly when closed', () => {
    render(
      <SubmissionPanel
        submission={mockSubmission}
        openRow={false}
        setOpenRow={jest.fn()}
        user={mockedUser}
      />
    );
    expect(screen.queryAllByText('Started').length).toBe(0);
    expect(screen.queryAllByText('Progress').length).toBe(0);
    expect(screen.getByText('Expand details'));
  });

  it('renders correctly when open', () => {
    render(
      <SubmissionPanel
        submission={mockSubmission}
        openRow={'123'}
        setOpenRow={jest.fn()}
        user={mockedUser}
      />
    );
    expect(screen.getByText('Started'));
    expect(screen.getByText('Progress'));
    expect(screen.getByText('Hide details'));
  });

  it('correctly fires the change handler', () => {
    const mockHandler = jest.fn();
    render(
      <SubmissionPanel
        submission={mockSubmission}
        openRow={false}
        setOpenRow={mockHandler}
        user={mockedUser}
      />
    );
    fireEvent.click(screen.getByText('Expand details'));
    expect(mockHandler).toBeCalled();
    expect(mockHandler).toBeCalledWith('123');
  });
});
