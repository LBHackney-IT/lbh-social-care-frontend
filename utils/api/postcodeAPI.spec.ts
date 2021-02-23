import { normalizeAddress } from './postcodeAPI';

describe('postcodeAPI', () => {
  describe('normalizeAddresses', () => {
    it('should work properly', () => {
      expect(
        normalizeAddress({
          line1: '407 QUEENSBRIDGE ROAD',
          line2: 'HACKNEY',
          line3: '',
          line4: 'foo',
          town: 'LONDON',
          postcode: 'E8 3AS',
          UPRN: '100021068079',
        })
      ).toEqual({
        address: '407 QUEENSBRIDGE ROAD, HACKNEY, foo',
        postcode: 'E8 3AS',
        uprn: '100021068079',
      });
    });

    it('should avoid to have postcode duplicate in address', () => {
      expect(
        normalizeAddress({
          line1: '407 QUEENSBRIDGE ROAD',
          line2: 'HACKNEY',
          line3: 'E8 3AS',
          line4: 'foo',
          town: 'LONDON',
          postcode: 'E8 3AS',
          UPRN: '100021068079',
        })
      ).toEqual({
        address: '407 QUEENSBRIDGE ROAD, HACKNEY, foo',
        postcode: 'E8 3AS',
        uprn: '100021068079',
      });
    });
  });
});
