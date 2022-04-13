import { Paginated } from '../../../types';
import { InProgressSubmission } from '../../../data/flexibleForms/forms.types';
import { mockInProgressSubmission } from '../../../factories/submissions';
import { useUnfinishedSubmissions } from '../../../utils/api/submissions';
import { render, screen } from '@testing-library/react';
import UnfinishedCaseNotes from '../../../components/ResidentPage/UnfinishedCaseNotes';

const unfinishedNotes: Paginated<InProgressSubmission> = {
  items: [mockInProgressSubmission, mockInProgressSubmission],
  count: 2,
};

const noUnfinishedNotes: Paginated<InProgressSubmission> = {
  items: [],
  count: 0,
};

jest.mock('../../../utils/api/submissions');
(useUnfinishedSubmissions as jest.Mock).mockReturnValue({
  data: unfinishedNotes,
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
  });
});
