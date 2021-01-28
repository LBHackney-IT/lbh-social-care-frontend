import axios from 'axios';

import * as allocatedWorkersAPI from './allocatedWorkers';

jest.mock('axios');

describe('allocatedWorkers APIs', () => {
  describe('getAllocatedWorkers', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 'bar' } });
      const data = await allocatedWorkersAPI.getAllocatedWorkers(123);
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        '/api/residents/123/allocated-workers'
      );
      expect(data).toEqual({ foo: 'bar' });
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

  describe('getTeams', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 'bar' } });
      const data = await allocatedWorkersAPI.getTeams();
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual('/api/teams');
      expect(data).toEqual({ foo: 'bar' });
    });
  });

  describe('getTeamWorkers', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 'bar' } });
      const data = await allocatedWorkersAPI.getTeamWorkers(123);
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual('/api/teams/123/workers');
      expect(data).toEqual({ foo: 'bar' });
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

  describe('getAllocationsByWorker', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 'bar' } });
      const data = await allocatedWorkersAPI.getAllocationsByWorker(123);
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        '/api/workers/123/allocations'
      );
      expect(data).toEqual({ foo: 'bar' });
    });
  });
});
