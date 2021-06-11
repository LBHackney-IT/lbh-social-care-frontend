import { render, screen, waitFor } from '@testing-library/react';
import DuplicateWarningPanel from './DuplicateWarningPanel';
import { useResidents } from 'utils/api/residents';

const mockResident = {
  firstName: 'foo',
  lastName: 'bar',
};

jest.mock('utils/api/residents');

describe('DuplicateWarningPanel', () => {
  it('should render nothing if there are no matching people', () => {
    (useResidents as jest.Mock).mockResolvedValue({
      data: [{ residents: [] }],
    });
    render(<DuplicateWarningPanel newResident={mockResident} />);
    waitFor(() => {
      expect(useResidents).toHaveBeenCalled();
      expect(screen.queryByText('This person may be a duplicate')).toBeNull();
    });
  });

  it('should render matches if there are any', () => {
    (useResidents as jest.Mock).mockResolvedValue({
      data: [
        {
          residents: [
            {
              mosaicId: 1,
              firstName: 'firstname',
              lastName: 'surname',
            },
          ],
        },
      ],
    });
    render(<DuplicateWarningPanel newResident={mockResident} />);
    waitFor(() => {
      expect(screen.getByText('This person may be a duplicate'));
      expect(screen.queryAllByRole('row').length).toBe(1);
    });
  });
});
