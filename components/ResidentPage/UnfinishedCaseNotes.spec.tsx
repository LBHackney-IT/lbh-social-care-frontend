import { useUnfinishedSubmissions } from '../../utils/api/submissions';
import UnfinishedCaseNotes from './UnfinishedCaseNotes';
import { render, screen } from '@testing-library/react';
import { Paginated } from '../../types';
import { InProgressSubmission } from '../../data/flexibleForms/forms.types';
import { mockInProgressSubmission } from '../../factories/submissions';

jest.mock('../../utils/api/submissions', () => {
  (useUnfinishedSubmissions as jest.Mock).mockReturnValue(null);
});

const unfinishedCasenote: InProgressSubmission = mockInProgressSubmission;

const blah: Paginated<InProgressSubmission> = Paginated.apply(
  unfinishedCasenote,
  unfinishedCasenote
);

describe('<UnfinishedCaseNotes/>', () => {
  it('Displays "No unfinished submissions" if there are no unfinished case notes', () => {
    render(<UnfinishedCaseNotes socialCareId={12345} />);
    expect(screen.getByText('No unfinished submissions to show')).toBeNull();
  });

  it('Shows the number of unfinished case notes when unfinished notes exist', () => {
    render(<UnfinishedCaseNotes socialCareId={12345} />);
  });

  it('opens and closes the component correctly', () => {
    render(<UnfinishedCaseNotes socialCareId={12345} />);
  });

  it('presents unfinished case notes as a valid link', () => {
    render(<UnfinishedCaseNotes socialCareId={12345} />);
  });
});
