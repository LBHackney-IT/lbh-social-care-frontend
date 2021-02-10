import axios from 'axios';

import * as allocatedWorkersAPI from './allocatedWorkers';
import * as SWR from 'swr';

jest.mock('axios');
jest.mock('swr');

describe('allocatedWorkers APIs', () => {
  describe('getAllocatedWorkers', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.getAllocatedWorkers(123);
      expect(SWR.default).toHaveBeenCalledWith(
        '/api/residents/123/allocated-workers'
      );
    });
  });

  describe('getTeams', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.getTeams();
      expect(SWR.default).toHaveBeenCalledWith('/api/teams');
    });
  });

  describe('getTeamWorkers', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.getTeamWorkers(123);
      expect(SWR.default).toHaveBeenCalledWith('/api/teams/123/workers');
    });
  });

  describe('getAllocationsByWorker', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      allocatedWorkersAPI.getAllocationsByWorker(123);
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
        '/api/residents/123/allocated-workers'
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
        '/api/residents/123/allocated-workers'
      );
      expect(axios.patch.mock.calls[0][1]).toEqual({
        foo: 'bar',
      });
      expect(data).toEqual({ foo: 'foobar' });
    });
  });
});
