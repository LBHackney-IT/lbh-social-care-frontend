import { useSubmission, useUnfinishedSubmissions } from './submissions';
import * as SWR from 'swr';
import { mockSubmission } from 'factories/submissions';
import { mockedResident } from 'factories/residents';

jest.mock('swr');

describe('submissions APIs', () => {
  describe('useUnfinishedSubmissions', () => {
    it('should call swr', () => {
      jest.spyOn(SWR, 'default');
      useUnfinishedSubmissions();
      expect(SWR.default).toHaveBeenCalled();
    });

    it('should filter submissions to the requested resident ', () => {
      jest.spyOn(SWR, 'default').mockImplementation(
        () =>
          ({
            data: {
              submissions: [
                mockSubmission,
                {
                  ...mockSubmission,
                  residents: [
                    {
                      ...mockedResident,
                      id: 2,
                    },
                  ],
                },
              ],
            },
          } as any)
      );
      const result = useUnfinishedSubmissions(1);
      expect(result.data?.submissions.length).toBe(1);
    });
  });

  describe('useSubmission', () => {
    it('should call swr', () => {
      jest.spyOn(SWR, 'default');
      useSubmission('foo');
      expect(SWR.default).toHaveBeenLastCalledWith('/api/submissions/foo');
    });
  });
});
