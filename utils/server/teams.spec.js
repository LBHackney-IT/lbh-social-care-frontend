import axios from 'axios';

import * as teamsAPI from './teams';

jest.mock('axios');

const { ENDPOINT_API, AWS_KEY } = process.env;

describe('teams APIs', () => {
  describe('getTeams', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 123, teams: 'bar' } });
      const data = await teamsAPI.getTeams({
        foo: 'bar',
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/teams`);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(axios.get.mock.calls[0][1].params).toEqual({
        foo: 'bar',
      });
      expect(data).toEqual({ foo: 123, teams: 'bar' });
    });
  });
});
