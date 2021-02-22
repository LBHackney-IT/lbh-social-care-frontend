import axios from 'axios';
import MockDate from 'mockdate';

import * as casesAPI from './cases';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const { ENDPOINT_API, AWS_KEY } = process.env;

describe('cases APIs', () => {
  describe('getCases', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { foo: 123, cases: [{ foo: 'bar' }] },
      });
      const data = await casesAPI.getCases({
        foo: 'bar',
      });
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/cases`);
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ foo: 123, cases: [{ foo: 'bar' }] });
    });
  });

  describe('getCasesByResident', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { foo: 123, cases: [{ foo: 'bar' }] },
      });
      const data = await casesAPI.getCasesByResident(123, { cursor: 321 });
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/cases`);
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(mockedAxios.get.mock.calls[0][1]?.params).toEqual({
        mosaic_id: 123,
        cursor: 321,
      });
      expect(data).toEqual({ foo: 123, cases: [{ foo: 'bar' }] });
    });
  });

  describe('addCase', () => {
    it('should work properly', async () => {
      MockDate.set('2000-11-22');
      mockedAxios.post.mockResolvedValue({ data: { _id: 'foobar' } });
      const data = await casesAPI.addCase({ foo: 'bar' });
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/cases`
      );
      expect(mockedAxios.post.mock.calls[0][1]).toEqual({
        caseFormData: '{"timestamp":"2000-11-22T00:00:00.000Z","foo":"bar"}',
      });
      expect(mockedAxios.post.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ ref: 'foobar' });
      MockDate.reset();
    });
  });
});
