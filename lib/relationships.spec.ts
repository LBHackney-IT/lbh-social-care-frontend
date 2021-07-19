import axios from 'axios';
import * as relationshipsAPI from './relationships';
import {
  mockedRelationship,
  mockedAddRelationship,
} from 'factories/relationships';

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
        `${ENDPOINT_API}/residents/123/relationships`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual(relationships);
    });
  });

  describe('addRelationship', () => {
    it('should work properly', async () => {
      const relationships = mockedAddRelationship;

      mockedAxios.post.mockResolvedValue({ data: {} });
      await relationshipsAPI.addRelationship({
        data: relationships,
      });
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/relationships/personal`
      );
      expect(mockedAxios.post.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
    });

    it('should throw an error with the wrong body', async () => {
      try {
        // @ts-expect-error check validation
        await relationshipsAPI.addRelationship(123);
      } catch (e) {
        expect(e.name).toEqual('ValidationError');
      }
    });
  });

  describe('removeRelationship', () => {
    it("calls the service API's relationships endpoint", async () => {
      const relationshipId = '123456789';
      mockedAxios.delete.mockResolvedValue({ data: {} });

      await relationshipsAPI.removeRelationship(relationshipId);

      expect(mockedAxios.delete).toHaveBeenCalled();
      expect(mockedAxios.delete.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/relationships/personal/${relationshipId}`
      );
      expect(mockedAxios.delete.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
    });
  });
});
