import axios from 'axios';

import * as allocatedWorkersAPI from './allocatedWorkers';
import * as SWR from 'swr';

jest.mock('axios');
jest.mock('swr');

describe('allocatedWorkers APIs', () => {
  describe('getAllocatedWorkers', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useAllocatedWorkers(123);
      expect(SWR.default).toHaveBeenCalledWith(
        '/api/residents/123/allocations'
      );
    });
  });

  describe('getResidentAllocation', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useResidentAllocation(123, 321);
      expect(SWR.default).toHaveBeenCalledWith(
        '/api/residents/123/allocations/321'
      );
    });
  });

  describe('getTeams', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useTeams();
      expect(SWR.default).toHaveBeenCalledWith('/api/teams');
    });

    it('should add ageContext if present', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useTeams({ ageContext: 'A' });
      expect(SWR.default).toHaveBeenCalledWith('/api/teams?ageContext=A');
    });
  });

  describe('getTeamWorkers', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useTeamWorkers(123);
      expect(SWR.default).toHaveBeenCalledWith('/api/teams/123/workers');
    });
  });

  describe('getAllocationsByWorker', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useAllocationsByWorker(123);
      expect(SWR.default).toHaveBeenCalledWith('/api/workers/123/allocations');
    });
  });

  describe('addAllocatedWorker', () => {
    it('should work properly', async () => {
      axios.post.mockResolvedValue({ data: { foo: 'foobar' } });
      const data = await allocatedWorkersAPI.addAllocatedWorker(123, {
        foo: 'bar',
      });
      expect(axios.post).toHaveBeenCalled();
      expect(axios.post.mock.calls[0][0]).toEqual(
        '/api/residents/123/allocations'
      );
      expect(axios.post.mock.calls[0][1]).toEqual({
        foo: 'bar',
      });
      expect(data).toEqual({ foo: 'foobar' });
    });
  });

  describe('deleteAllocatedWorker', () => {
    it('should work properly', async () => {
      axios.patch.mockResolvedValue({ data: { foo: 'foobar' } });
      const data = await allocatedWorkersAPI.deleteAllocatedWorker(123, {
        foo: 'bar',
      });
      expect(axios.patch).toHaveBeenCalled();
      expect(axios.patch.mock.calls[0][0]).toEqual(
        '/api/residents/123/allocations'
      );
      expect(axios.patch.mock.calls[0][1]).toEqual({
        foo: 'bar',
      });
      expect(data).toEqual({ foo: 'foobar' });
    });
  });
});
