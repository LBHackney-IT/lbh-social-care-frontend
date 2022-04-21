import axios, { AxiosError } from 'axios';

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
        `${ENDPOINT_API}/allocations?sort_by=rag_rating&status=open`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(mockedAxios.get.mock.calls[0][1]?.params).toEqual({
        mosaic_id: 123,
      });
      expect(data).toEqual({ allocations: ['hello'] });
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
      const data = await allocatedWorkersAPI.getResidentAllocation(1);
      expect(data).toEqual({
        id: 1,
        allocationEndDate: null,
        caseStatus: 'Closed',
      });
      const nodata = await allocatedWorkersAPI.getResidentAllocation(3);
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

  describe('deleteAllocation', () => {
    it('should send the correct request object to the correct endpoint', async () => {
      mockedAxios.patch.mockResolvedValue({ data: { foo: 'foobar' } });
      const data = await allocatedWorkersAPI.deleteAllocation({
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

    it('should throw an error with no body', async () => {
      try {
        // @ts-expect-error check validatio
        await allocatedWorkersAPI.deleteAllocation();
      } catch (e) {
        expect((e as AxiosError).name).toEqual('ValidationError');
      }
    });
    it('should throw an error with the wrong body', async () => {
      try {
        // @ts-expect-error check validatio
        await allocatedWorkersAPI.deleteAllocation({
          deallocationReason: 'test',
          deallocationDate: '01/01/2021',
          createdBy: 'jest.jestington@gmail.com',
        });
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
        `${ENDPOINT_API}/allocations?sort_by=rag_rating&status=open`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(mockedAxios.get.mock.calls[0][1]?.params).toEqual({
        worker_id: 123,
      });
      expect(data).toEqual({ allocations: ['foo'] });
    });
    it('should send ragRating properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { allocations: ['foo'] },
      });
      const data = await allocatedWorkersAPI.getAllocationsByWorker(
        123,
        'date_added'
      );
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/allocations?sort_by=date_added&status=open`
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
  describe('getAllocationsByTeam', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { allocations: ['foo'] },
      });
      const data = await allocatedWorkersAPI.getAllocationsByTeam({
        team_id: 123,
        sort_by: 'rag_rating',
        status: 'open',
        team_allocation_status: 'unallocated',
      });
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/allocations?team_id=123&sort_by=rag_rating&status=open&team_allocation_status=unallocated&showOnlyOpen=true`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ allocations: ['foo'] });
    });
  });

  describe('addWorkerAllocation', () => {
    it('should send the correct parameters to the correct endpoint', async () => {
      mockedAxios.post.mockResolvedValue({
        data: { allocations: ['foo'] },
      });
      const data = await allocatedWorkersAPI.addWorkerAllocation(123, {
        allocationId: 1,
        allocatedTeamId: 12,
        allocatedWorkerId: 123,
        allocationStartDate: '2022-12-12',
      });
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/allocations`
      );
      expect(mockedAxios.post.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ allocations: ['foo'] });
    });
  });
  describe('patchAllocation', () => {
    it('should send the correct parameters to the correct endpoint', async () => {
      mockedAxios.patch.mockResolvedValue({
        data: { allocations: ['foo'] },
      });
      const data = await allocatedWorkersAPI.patchAllocation({
        allocationId: 1,
        ragRating: 'purple',
      });
      expect(mockedAxios.patch).toHaveBeenCalled();
      expect(mockedAxios.patch.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/allocations`
      );
      expect(mockedAxios.patch.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ allocations: ['foo'] });
    });
  });
});
