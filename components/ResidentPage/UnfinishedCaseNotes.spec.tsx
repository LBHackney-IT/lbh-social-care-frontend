import { useUnfinishedSubmissions } from '../../utils/api/submissions';
import UnfinishedCaseNotes from './UnfinishedCaseNotes';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Paginated } from '../../types';
import { InProgressSubmission } from '../../data/flexibleForms/forms.types';
import { mockInProgressSubmission } from '../../factories/submissions';
import { useWorker } from '../../utils/api/workers';
import { mockedWorker } from '../../factories/workers';

const unfinishedNotes: Paginated<InProgressSubmission> = {
  items: [
    mockInProgressSubmission,
    { ...mockInProgressSubmission, submissionId: '124' },
  ],
  count: 2,
};

const noUnfinishedNotes: Paginated<InProgressSubmission> = {
  items: [],
  count: 0,
};

jest.mock('../../utils/api/submissions');
(useUnfinishedSubmissions as jest.Mock).mockReturnValue({
  data: unfinishedNotes,
});

jest.mock('../../utils/api/workers');
(useWorker as jest.Mock).mockReturnValue({
  data: [mockedWorker],
});

describe('<UnfinishedCaseNotes/>', () => {
  it('Displays no text if there are no unfinished case notes', () => {
    (useUnfinishedSubmissions as jest.Mock).mockReturnValue({
      data: noUnfinishedNotes,
    });

    render(<UnfinishedCaseNotes socialCareId={12345} />);
    expect(
      screen.getByText('There are no unfinished case notes for this resident')
    );
  });

  it('Shows the number of unfinished case notes when unfinished notes exist', () => {
    (useUnfinishedSubmissions as jest.Mock).mockReturnValue({
      data: unfinishedNotes,
    });
    render(<UnfinishedCaseNotes socialCareId={12345} />);
    expect(screen.getByText('2 unfinished case notes'));
  });

  it('opens and closes the dialog correctly', async () => {
    render(<UnfinishedCaseNotes socialCareId={12345} />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('2 unfinished case notes'));
    });
    expect(screen.getByText('Unfinished case notes'));
    expect(screen.getAllByText('Foo Bar at 21 Jun 2021'));
  });

  it('presents unfinished case notes as a valid link', async () => {
    render(<UnfinishedCaseNotes socialCareId={12345} />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('2 unfinished case notes'));
    });

    expect(
      (screen.getAllByRole('link')[0] as HTMLAnchorElement).href
    ).toContain('/submissions/123');

    expect(
      (screen.getAllByRole('link')[1] as HTMLAnchorElement).href
    ).toContain('/submissions/124');
  });
});
