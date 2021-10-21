import { render } from '@testing-library/react';
import * as caseStatusApi from 'utils/api/caseStatus';
import AnnouncementMessage from './AnnouncementMessage';
import {
  mockedCaseStatusFactory,
  mockedStatusField,
} from 'factories/caseStatus';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
  reload: jest.fn(),
}));

describe('AnnouncementMessage component', () => {
  it("displays nothing if there's no scheduled case status", async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C2',
              startDate: '2019-12-25',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, queryByTestId } = render(<AnnouncementMessage />);

    expect(queryByText('Child in need')).not.toBeInTheDocument();
    expect(queryByTestId('case_status_details_table')).toBeNull;
  });
});
