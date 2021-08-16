import { render, screen, waitFor } from '@testing-library/react';
import DuplicateWarningPanel from './DuplicateWarningPanel';
import { useResidents } from 'utils/api/residents';
import { canManageCases } from 'lib/permissions';

const mockResident = {
  firstName: 'foo',
  lastName: 'bar',
};

jest.mock('utils/api/residents');
jest.mock('lib/permissions');

describe('DuplicateWarningPanel', () => {
  it('should render nothing if there are no matching people', () => {
    (useResidents as jest.Mock).mockImplementation(() => ({
      data: [{ residents: [] }],
    }));

    render(<DuplicateWarningPanel newResident={mockResident} />);

    expect(useResidents).toHaveBeenCalled();
    expect(screen.queryByText('This person may be a duplicate')).toBeNull();
  });

  it('should render matches if there are any', () => {
    (useResidents as jest.Mock).mockImplementation(() => ({
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
    }));
    (canManageCases as jest.Mock).mockImplementation(() => true);

    render(<DuplicateWarningPanel newResident={mockResident} />);

    expect(screen.getByText('This person may be a duplicate')).toBeVisible();
    expect(screen.getByText('firstname surname')).toBeVisible();
  });
});
