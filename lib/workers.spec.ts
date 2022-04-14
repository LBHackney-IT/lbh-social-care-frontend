import axios from 'axios';

import * as workersAPI from './workers';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

describe('workers APIs', () => {
  describe('getWorkers', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({ data: { foo: 123, workers: 'bar' } });
      const data = await workersAPI.getWorkers({
        foo: 'bar',
      });
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/workers?foo=bar`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ foo: 123, workers: 'bar' });
    });
  });

  describe('getWorker', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{ allocations: ['foo'] }],
      });
      const data = await workersAPI.getWorker(123);
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/workers?id=123`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ allocations: ['foo'] });
    });
  });

  describe('getWorkerByEmail', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{ allocations: ['foo'] }],
      });
      const data = await workersAPI.getWorkerByEmail('foo@bar.com');
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/workers`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(mockedAxios.get.mock.calls[0][1]?.params).toEqual({
        email: 'foo@bar.com',
      });
      expect(data).toEqual({ allocations: ['foo'] });
    });
  });
});
