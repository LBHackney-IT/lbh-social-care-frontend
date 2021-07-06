import DiscardDialog from './DiscardDialog';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');
axios.delete = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('DiscardDialog', () => {
  it('can be opened and closed', () => {
    render(<DiscardDialog submissionId="foo" />);
    fireEvent.click(screen.getByText('Discard'));
    expect(
      screen.getByText('Are you sure you want to discard this submission?')
    );
    fireEvent.click(screen.getByText('No, cancel'));
    expect(
      screen.queryAllByText('Are you sure you want to discard this submission?')
        .length
    ).toBe(0);
    expect(axios.delete).toBeCalledTimes(0);
  });

  it('can correctly trigger the discard handler', async () => {
    render(<DiscardDialog submissionId="foo" />);
    fireEvent.click(screen.getByText('Discard'));
    fireEvent.click(screen.getByText('Yes, discard'));
    await waitFor(() => {
      expect(axios.delete).toBeCalledTimes(1);
      expect(axios.delete).toBeCalledWith('/api/submissions/foo');
    });
  });
});
