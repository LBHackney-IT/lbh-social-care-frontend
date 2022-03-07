import axios from 'axios';
import * as searchAPI from './search';
import { mockedLegacyResident } from 'factories/residents';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');

describe('search APIs', () => {
  describe('searchPerson', () => {
    it("calls the service API's search person endpoint", async () => {
      mockedAxios.get.mockResolvedValue({
        data: [mockedLegacyResident],
      });

      const data = await searchAPI.searchPerson(
        {
          foo: 'bar',
        },
        'A'
      );

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/search/person`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual([mockedLegacyResident]);
    });
  });
});
