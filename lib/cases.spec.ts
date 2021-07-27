import axios from 'axios';
import MockDate from 'mockdate';
import { userFactory } from '../factories/users';

import * as casesAPI from './cases';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

describe('sanitiseCaseFormData', () => {
  it('should work properly', () => {
    expect(
      casesAPI.sanitiseCaseFormData(
        '{ "_id" : ObjectId("608bbaf33231b56b163e4d99"), "text" : "(foo), bar"}'
      )
    ).toEqual({ text: '(foo), bar' });
  });
});

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

  describe('getHistoricNote', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { foo: 123 },
      });
      const data = await casesAPI.getHistoricNote('123', {
        foo: 'bar',
      });
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/casenotes/123`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ foo: 123 });
    });
  });

  describe('getHistoricVisit', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { foo: 123 },
      });
      const data = await casesAPI.getHistoricVisit('123', {
        foo: 'bar',
      });
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/visits/123`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ foo: 123 });
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
      expect(mockedAxios.post.mock.calls[0][1]).toEqual({ foo: 'bar' });
      expect(mockedAxios.post.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ _id: 'foobar' });
      MockDate.reset();
    });
  });

  describe('getCase', () => {
    it('should call the API passing the correct headers', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { foo: 'bar' },
      });
      const mockedUser = userFactory.build();
      await casesAPI.getCase('case-id-123', {}, mockedUser);

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/cases/case-id-123`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
    });

    it('should return the data from the API response', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { foo: 'bar' },
      });

      const mockedUser = userFactory.build();
      const data = await casesAPI.getCase('case-id-123', {}, mockedUser);

      expect(data).toEqual({ foo: 'bar' });
    });

    it('should call the API passing through the provided params and the default auditing params', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { foo: 'bar' },
      });
      const mockedUser = userFactory.build();
      await casesAPI.getCase(
        'case-id-123',
        {
          some: 'param',
          other: 'value',
        },
        mockedUser
      );

      expect(mockedAxios.get.mock.calls[0][1]?.params).toEqual({
        some: 'param',
        other: 'value',
        auditingEnabled: false,
      });
    });

    it('should call the API passing through the auditing params as enabled when the user is in the auditable group', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { foo: 'bar' },
      });
      const mockedUser = userFactory.build({
        isAuditable: true,
      });
      await casesAPI.getCase('case-id-123', {}, mockedUser);

      expect(mockedAxios.get.mock.calls[0][1]?.params).toEqual({
        auditingEnabled: true,
        userId: mockedUser.email,
      });
    });
  });
});
