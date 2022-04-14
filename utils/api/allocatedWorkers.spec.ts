import axios from 'axios';

import * as allocatedWorkersAPI from './allocatedWorkers';
import * as SWR from 'swr';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockSWRInfinite = jest.fn();

jest.mock('swr');

describe('allocatedWorkers APIs', () => {
  describe('useAllocatedWorkers', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useAllocatedWorkers(123);
      expect(SWR.default).toHaveBeenCalledWith(
        '/api/residents/123/allocations'
      );
    });
  });
  describe('useAllocationsByTeam', () => {
    it('should work properly', () => {
      jest
        .spyOn(SWR, 'useSWRInfinite')
        .mockImplementation(
          (getKey: (page: number, data: Record<string, unknown>) => string) =>
            mockSWRInfinite(getKey(0, { allocations: [] }))
        );
      allocatedWorkersAPI.useAllocationsByTeam(123, {
        foo: 'bar',
      });
      expect(mockSWRInfinite).toHaveBeenCalledWith(
        `/api/teams/123/allocations?foo=bar`
      );
    });
  });

  describe('useResidentAllocation', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useResidentAllocation(123, 321);
      expect(SWR.default).toHaveBeenCalledWith(
        '/api/residents/123/allocations/321'
      );
    });
  });

  describe('useTeams', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useTeams({ ageContext: undefined });
      expect(SWR.default).toHaveBeenCalledWith('/api/teams');
    });

    it('should add ageContext if present', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useTeams({ ageContext: 'A' });
      expect(SWR.default).toHaveBeenCalledWith('/api/teams?ageContext=A');
    });
  });

  describe('useTeamWorkers', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useTeamWorkers(123);
      expect(SWR.default).toHaveBeenCalledWith('/api/teams/123/workers');
    });
  });

  describe('useAllocationsByWorker', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.useAllocationsByWorker(123);
      expect(SWR.default).toHaveBeenCalledWith('/api/workers/123/allocations');
    });
  });

  describe('addAllocatedWorker', () => {
    it('should work properly', async () => {
      mockedAxios.post.mockResolvedValue({ data: { foo: 'foobar' } });
      const data = await allocatedWorkersAPI.addAllocatedWorker(123, {
        foo: 'bar',
      });
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post.mock.calls[0][0]).toEqual(
        '/api/residents/123/allocations'
      );
      expect(mockedAxios.post.mock.calls[0][1]).toEqual({
        foo: 'bar',
      });
      expect(data).toEqual({ foo: 'foobar' });
    });
  });

  describe('deleteAllocation', () => {
    it('should work properly', async () => {
      mockedAxios.patch.mockResolvedValue({ data: { foo: 'foobar' } });
      const data = await allocatedWorkersAPI.deleteAllocation(123, {
        foo: 'bar',
      });
      expect(mockedAxios.patch).toHaveBeenCalled();
      expect(mockedAxios.patch.mock.calls[0][0]).toEqual(
        '/api/residents/123/allocations'
      );
      expect(mockedAxios.patch.mock.calls[0][1]).toEqual({
        foo: 'bar',
      });
      expect(data).toEqual({ foo: 'foobar' });
    });
  });
});
