import axios from 'axios';
import * as relationshipsAPI from './relationships';
import { mockedRelationship } from 'factories/relationships';

const { ENDPOINT_API, AWS_KEY } = process.env;
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');

describe('relationships APIs', () => {
  describe('getRelationshipByResident', () => {
    it("calls the service API's relationships endpoint", async () => {
      const relationships = mockedRelationship;
      mockedAxios.get.mockResolvedValue({
        data: relationships,
      });

      const data = await relationshipsAPI.getRelationshipByResident(123);
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/residents/123/relationships-v1`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual(relationships);
    });
  });
});
