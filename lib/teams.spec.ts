import axios from 'axios';

import * as teamsAPI from './teams';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

describe('teams APIs', () => {
  describe('getTeams', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({ data: { foo: 123, teams: 'bar' } });
      const data = await teamsAPI.getTeams({
        foo: 'bar',
      });
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/teams`);
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(mockedAxios.get.mock.calls[0][1]?.params).toEqual({
        foo: 'bar',
      });
      expect(data).toEqual({ foo: 123, teams: 'bar' });
    });
  });
});
