import { render, screen, waitFor } from '@testing-library/react';
import DuplicateWarningPanel from './DuplicateWarningPanel';
import axios from 'axios';

const mockResident = {
  firstName: 'foo',
  lastName: 'bar',
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DuplicateWarningPanel', () => {
  it('should render nothing if there are no matching people', () => {
    mockedAxios.get.mockResolvedValue({
      data: { residents: [] },
    });
    render(<DuplicateWarningPanel newResident={mockResident} />);
    waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(screen.queryByText('This person may be a duplicate')).toBeNull();
    });
  });

  it('should render matches if there are any', () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        residents: [
          {
            mosaicId: 1,
            firstName: 'firstname',
            lastName: 'surname',
          },
        ],
      },
    });
    render(<DuplicateWarningPanel newResident={mockResident} />);
    waitFor(() => {
      expect(screen.getByText('This person may be a duplicate'));
      expect(screen.queryAllByRole('row').length).toBe(1);
    });
  });
});
