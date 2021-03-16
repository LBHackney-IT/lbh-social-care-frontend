import * as warningNotesAPI from './warningNotes';
import * as SWR from 'swr';

jest.mock('swr');

describe('warningNotes API', () => {
  describe('useWarningNotes', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      warningNotesAPI.useWarningNotes(123);
      expect(SWR.default).toHaveBeenCalledWith(
        '/api/residents/123/warning-notes'
      );
    });
  });

  describe('useWarningNote', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      warningNotesAPI.useWarningNote(123);
      expect(SWR.default).toHaveBeenCalledWith('/api/warning-notes/123');
    });
  });
});
