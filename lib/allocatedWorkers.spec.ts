import axios, { AxiosError } from 'axios';
import endOfTomorrow from 'date-fns/endOfTomorrow';

import * as allocatedWorkersAPI from './allocatedWorkers';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

describe('allocatedWorkersAPI', () => {
  describe('getResidentAllocatedWorkers', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { allocations: ['hello'] },
      });
      const data = await allocatedWorkersAPI.getResidentAllocatedWorkers(123);
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/allocations`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(mockedAxios.get.mock.calls[0][1]?.params).toEqual({
        mosaic_id: 123,
      });
      expect(data).toEqual({ allocations: ['hello'] });
    });

    it('should filter out closed or expired allocations', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          allocations: [
            {
              id: 1,
              allocationEndDate: null,
              caseStatus: 'Closed',
            },
            {
              id: 2,
              allocationEndDate: null,
              caseStatus: 'closed',
            },
            {
              id: 3,
              allocationEndDate: null,
              caseStatus: 'Open',
            },
            {
              id: 4,
              allocationEndDate: '2020-01-31 00:00:00',
              caseStatus: 'Open',
            },
            {
              id: 5,
              allocationEndDate: endOfTomorrow(),
              caseStatus: 'Open',
            },
          ],
        },
      });
      const data = await allocatedWorkersAPI.getResidentAllocatedWorkers(123);
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/allocations`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(mockedAxios.get.mock.calls[0][1]?.params).toEqual({
        mosaic_id: 123,
      });
      expect(data).toEqual({
        allocations: [
          {
            id: 3,
            allocationEndDate: null,
            caseStatus: 'Open',
          },
          {
            id: 5,
            allocationEndDate: endOfTomorrow(),
            caseStatus: 'Open',
          },
        ],
      });
    });
  });

  describe('getResidentAllocation', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          allocations: [
            {
              id: 1,
              allocationEndDate: null,
              caseStatus: 'Closed',
            },
          ],
        },
      });
      const data = await allocatedWorkersAPI.getResidentAllocation(123, 1);
      expect(data).toEqual({
        id: 1,
        allocationEndDate: null,
        caseStatus: 'Closed',
      });
      const nodata = await allocatedWorkersAPI.getResidentAllocation(123, 3);
      expect(nodata).toEqual(undefined);
    });
  });

  describe('addAllocatedWorker', () => {
    it('should work properly', async () => {
      mockedAxios.post.mockResolvedValue({ data: { foo: 'foobar' } });
      const data = await allocatedWorkersAPI.addAllocatedWorker(123, {
        allocatedWorkerId: 123,
        allocatedTeamId: 321,
        ragRating: 'purple',
        allocationStartDate: '01-04-2021',
        createdBy: 'jest.jestington@gmail.com',
      });
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/allocations`
      );
      expect(mockedAxios.post.mock.calls[0][1]).toEqual({
        ragRating: 'purple',
        allocatedTeamId: 321,
        allocatedWorkerId: 123,
        mosaicId: 123,
        allocationStartDate: '01-04-2021',
        createdBy: 'jest.jestington@gmail.com',
      });
      expect(mockedAxios.post.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ foo: 'foobar' });
    });

    it('should throw an error with the wrong body', async () => {
      try {
        // @ts-expect-error check validation
        await allocatedWorkersAPI.addAllocatedWorker(123);
      } catch (e) {
        expect((e as AxiosError).name).toEqual('ValidationError');
      }
    });
  });

  describe('deleteAllocatedWorker', () => {
    it('should work properly', async () => {
      mockedAxios.patch.mockResolvedValue({ data: { foo: 'foobar' } });
      const data = await allocatedWorkersAPI.deleteAllocatedWorker({
        id: 123,
        deallocationReason: 'test',
        deallocationDate: '01/01/2021',
        createdBy: 'jest.jestington@gmail.com',
      });
      expect(mockedAxios.patch).toHaveBeenCalled();
      expect(mockedAxios.patch.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/allocations`
      );
      expect(mockedAxios.patch.mock.calls[0][1]).toEqual({
        id: 123,
        deallocationReason: 'test',
        deallocationDate: '01/01/2021',
        createdBy: 'jest.jestington@gmail.com',
      });
      expect(mockedAxios.patch.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ foo: 'foobar' });
    });

    it('should throw an error with the wrong body', async () => {
      try {
        // @ts-expect-error check validation
        await allocatedWorkersAPI.deleteAllocatedWorker();
      } catch (e) {
        expect((e as AxiosError).name).toEqual('ValidationError');
      }
    });
  });

  describe('getAllocationsByWorker', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { allocations: ['foo'] },
      });
      const data = await allocatedWorkersAPI.getAllocationsByWorker(123);
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/allocations`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(mockedAxios.get.mock.calls[0][1]?.params).toEqual({
        worker_id: 123,
      });
      expect(data).toEqual({ allocations: ['foo'] });
    });
  });
});
