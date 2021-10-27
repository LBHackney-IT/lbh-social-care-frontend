import { render } from '@testing-library/react';
import AnnouncementMessage from './AnnouncementMessage';

describe('AnnouncementMessage component', () => {
  it('should render the title and content props properly', async () => {
    const title = 'An update has already been scheduled for this status';
    const content =
      'Any changes you make here will overwrite the scheduled update';
    const { queryByText, queryByTestId } = render(
      <AnnouncementMessage title={title} content={content} />
    );

    expect(
      queryByText('An update has already been scheduled for this status')
    ).toBeInTheDocument();
    expect(
      queryByText(
        'Any changes you make here will overwrite the scheduled update'
      )
    ).toBeInTheDocument();
    expect(queryByTestId('announcement_message_box')).not.toBeNull();
  });

  it('should render only the title props properly when no content has been added', async () => {
    const title = 'An update has already been scheduled for this status';

    const { queryByText, queryByTestId } = render(
      <AnnouncementMessage title={title} />
    );

    expect(
      queryByText('An update has already been scheduled for this status')
    ).toBeInTheDocument();
    expect(
      queryByText(
        'Any changes you make here will overwrite the scheduled update'
      )
    ).not.toBeInTheDocument();
    expect(queryByTestId('announcement_message_box')).not.toBeNull;
  });
});
