import { formatAddress, lookupPostcode } from 'utils/api/postcodeAPI';
import axios from 'axios';
import { addressAPIWrapperFactory } from 'factories/postcode';

jest.mock('swr');
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('postcodeAPI', () => {
  describe('normalizeAddresses', () => {
    it('should format address data', () => {
      expect(
        formatAddress({
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
        formatAddress({
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

      const mocked_results = addressAPIWrapperFactory.build();
      mockedAxios.get.mockResolvedValue({
        data: mocked_results,
      });

      const postcode = 'SW1A 0AA';
      const page_number = 1;
      const building_number = '1';

      await lookupPostcode(postcode, 1, building_number);

      expect(axios.get).toHaveBeenCalledWith(
        `/api/postcode/${postcode}?page=${page_number}&buildingNumber=${building_number}`
      );
    });
  });
});
