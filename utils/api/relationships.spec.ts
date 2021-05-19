import * as relationshipsAPI from './relationships';
import * as SWR from 'swr';

jest.mock('swr');

describe('relationships APIs', () => {
  describe('useRelationships', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      relationshipsAPI.useRelationships(123);
      expect(SWR.default).toHaveBeenCalledWith(
        'https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0/residents/123/relationships'
      );
      // expect(SWR.default).toHaveBeenCalledWith('/residents/123/relationships');
    });
  });
});
