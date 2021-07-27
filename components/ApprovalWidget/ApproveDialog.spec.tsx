import ApproveDialog from './ApproveDialog';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockSubmission } from 'factories/submissions';
import axios from 'axios';
import { useRouter } from 'next/router';

jest.mock('axios');

const mockHandler = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    reload: mockHandler,
  }),
}));

beforeEach(() => jest.resetAllMocks());

describe('ApproveDialog', () => {
  it('renders an approve button', () => {
    render(
      <ApproveDialog
        isOpen={true}
        setOpen={jest.fn()}
        submission={mockSubmission}
      />
    );
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByText('Yes, approve'));
  });

  it('makes a request to the right api route, then reloads the page', async () => {
    render(
      <ApproveDialog
        isOpen={true}
        setOpen={jest.fn()}
        submission={mockSubmission}
      />
    );
    fireEvent.click(screen.getByText('Yes, approve'));
    await waitFor(() => {
      expect(axios.post).toBeCalledTimes(1);
      expect(axios.post).toBeCalledWith('/api/submissions/123/approvals');
      expect(useRouter().reload).toBeCalledTimes(1);
    });
  });

  it('renders an error message', async () => {
    (axios.post as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('foo'))
    );

    render(
      <ApproveDialog
        isOpen={true}
        setOpen={jest.fn()}
        submission={mockSubmission}
      />
    );

    fireEvent.click(screen.getByText('Yes, approve'));
    await waitFor(() => {
      expect(axios.post).toBeCalledTimes(1);
      expect(screen.getByText('There was a problem approving the submission'));
    });
  });
});
