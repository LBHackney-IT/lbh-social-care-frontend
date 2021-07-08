import RejectDialog from './RejectDialog';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockSubmission } from 'factories/submissions';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => jest.resetAllMocks());

describe('RejectDialog', () => {
  it('renders the reject form', () => {
    render(
      <RejectDialog
        isOpen={true}
        setOpen={jest.fn()}
        submission={mockSubmission}
      />
    );
    expect(screen.getAllByRole('textbox').length).toBe(1);
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByText('Submit'));
  });

  it('makes a request to the right api route', async () => {
    render(
      <RejectDialog
        isOpen={true}
        setOpen={jest.fn()}
        submission={mockSubmission}
      />
    );
    fireEvent.change(
      screen.getByLabelText('What needs to be changed?', { exact: false }),
      {
        target: { value: 'This is a test reason' },
      }
    );
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(axios.delete).toBeCalledTimes(1);
      expect(axios.delete).toBeCalledWith('/api/submissions/123/approvals', {
        data: { rejectionReason: 'This is a test reason' },
      });
    });
  });

  it('renders an error message', async () => {
    (axios.delete as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('foo'))
    );

    render(
      <RejectDialog
        isOpen={true}
        setOpen={jest.fn()}
        submission={mockSubmission}
      />
    );

    fireEvent.change(
      screen.getByLabelText('What needs to be changed?', { exact: false }),
      {
        target: { value: 'This is a test reason' },
      }
    );
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(axios.delete).toBeCalledTimes(1);
      expect(screen.getByText('There was a problem returning the submission'));
    });
  });
});
