import * as postcodeAPI from './postcodeAPI';
import axios from 'axios';

jest.mock('swr');
jest.mock('axios');

describe('postcodeAPI', () => {
  describe('normalizeAddresses', () => {
    it('should format address data', () => {
      expect(
        postcodeAPI.formatAddress({
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
        postcodeAPI.formatAddress({
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

  describe('lookupPostcode', () => {
    it('calls the GET /api/postcode/ endpoint in Next backend', async () => {
      jest.spyOn(axios, 'get');

      const postcode = 'SW1A 0AA';
      const page_number = 1;
      const building_number = '1';

      await postcodeAPI.lookupPostcode(postcode, 1, building_number);

      expect(axios.get).toHaveBeenCalledWith(
        `/api/postcode/${postcode}?page=${page_number}&buildingNumber=${building_number}`
      );
    });
  });
});
