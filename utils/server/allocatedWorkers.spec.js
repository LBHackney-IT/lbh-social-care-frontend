import axios from 'axios';

import * as allocatedWorkersAPI from './allocatedWorkers';

jest.mock('axios');

const { ENDPOINT_API, AWS_KEY } = process.env;

describe('allocatedWorkersAPI', () => {
  describe('getResidentAllocatedWorkers', () => {
    it.skip('should work properly', async () => {
      axios.get.mockResolvedValue({
        data: { allocations: 'hello' },
      });
      const data = await allocatedWorkersAPI.getResidentAllocatedWorkers(123);
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/allocations`);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(axios.get.mock.calls[0][1].params).toEqual({
        mosaic_id: 123,
      });
      expect(data).toEqual({ allocations: 'hello' });
    });
  });

  describe('addAllocatedWorker', () => {
    it('should work properly', async () => {
      axios.post.mockResolvedValue({ data: { foo: 'foobar' } });
      const data = await allocatedWorkersAPI.addAllocatedWorker(123, {
        allocatedWorkerId: '123',
        allocatedBy: 'foo@bar.com',
      });
      expect(axios.post).toHaveBeenCalled();
      expect(axios.post.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/allocations`
      );
      expect(axios.post.mock.calls[0][1]).toEqual({
        allocatedBy: 'foo@bar.com',
        allocatedWorkerId: 123,
        mosaicId: 123,
      });
      expect(axios.post.mock.calls[0][2].headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ foo: 'foobar' });
    });

    it('should throw an error with the wrong body', async () => {
      try {
        await allocatedWorkersAPI.addAllocatedWorker(123);
      } catch (e) {
        expect(e.name).toEqual('ValidationError');
      }
    });
  });

  describe('deleteAllocatedWorker', () => {
    it('should work properly', async () => {
      axios.patch.mockResolvedValue({ data: { foo: 'foobar' } });
      const data = await allocatedWorkersAPI.deleteAllocatedWorker({
        id: '123',
        deallocationReason: 'test',
      });
      expect(axios.patch).toHaveBeenCalled();
      expect(axios.patch.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/allocations`
      );
      expect(axios.patch.mock.calls[0][1]).toEqual({
        id: 123,
        deallocationReason: 'test',
      });
      expect(axios.patch.mock.calls[0][2].headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ foo: 'foobar' });
    });

    it('should throw an error with the wrong body', async () => {
      try {
        await allocatedWorkersAPI.deleteAllocatedWorker();
      } catch (e) {
        console.log('error: ' + e);
        expect(e.name).toEqual('ValidationError');
      }
    });
  });
});
