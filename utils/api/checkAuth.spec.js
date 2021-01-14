import axios from 'axios';

import { getUser } from './checkAuth';

jest.mock('axios');

describe('checkAuth APIs', () => {
  describe('getUser', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 'bar' } });
      const data = await getUser();
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual('/api/check-auth');
      expect(data).toEqual({ foo: 'bar' });
    });
  });
});
