import { allocateResident, allocateResidentSchema } from './allocations';
import axios from 'axios';

process.env.ENDPOINT_API = 'https://test-api';

jest.mock('axios');
(axios.post as jest.Mock).mockResolvedValue({});

describe('validating the allocation request', () => {
  describe('a valid request', () => {
    let data = {};
    beforeAll(async () => {
      data = await allocateResidentSchema.validate({
        personId: 3057982,
        allocatedTeamId: 81,
        createdBy: 93,
        summary: 'A reason that is totally valid',
        carePackage: 'look after them',
        ragRating: 'purple',
        allocationDate: new Date('2022-01-27T15:33:13.839Z'),
      });
    });

    test('validated data includes the personId', () => {
      expect(data).toHaveProperty('personId', 3057982);
    });
    test('validated data includes the allocatedTeamId', () => {
      expect(data).toHaveProperty('allocatedTeamId', 81);
    });
    test('validated data includes the createdBy', () => {
      expect(data).toHaveProperty('createdBy', 93);
    });
    test('validated data includes the summary', () => {
      expect(data).toHaveProperty('summary', 'A reason that is totally valid');
    });
    test('validated data includes the carePackage', () => {
      expect(data).toHaveProperty('carePackage', 'look after them');
    });
    test('validated data includes the ragRating', () => {
      expect(data).toHaveProperty('ragRating', 'purple');
    });
    test('validated data includes the allocationDate', () => {
      expect(data).toHaveProperty(
        'allocationDate',
        new Date('2022-01-27T15:33:13.839Z')
      );
    });
  });
  describe('when the personId is invalid', () => {
    test('validation throws an error', async () => {
      await expect(
        allocateResidentSchema.validate({
          personId: 'invalid',
          allocatedTeamId: 81,
          createdBy: 93,
          summary: 'A reason that is totally valid',
          carePackage: 'look after them',
          ragRating: 'purple',
          allocationDate: new Date(Date.parse('2022-01-27 15:33:13.839')),
        })
      ).rejects.toThrow(
        'personId must be a `number` type, but the final value was: `NaN` (cast from the value `"invalid"`).'
      );
    });
  });
  describe('when the allocatedTeamId is invalid', () => {
    test('validation throws an error', async () => {
      await expect(
        allocateResidentSchema.validate({
          personId: 3057982,
          allocatedTeamId: 'invalid',
          createdBy: 93,
          summary: 'A reason that is totally valid',
          carePackage: 'look after them',
          ragRating: 'purple',
          allocationDate: new Date(Date.parse('2022-01-27 15:33:13.839')),
        })
      ).rejects.toThrow(
        'allocatedTeamId must be a `number` type, but the final value was: `NaN` (cast from the value `"invalid"`).'
      );
    });
  });
  describe('when the createdBy is invalid', () => {
    test('validation throws an error', async () => {
      await expect(
        allocateResidentSchema.validate({
          personId: 3057982,
          allocatedTeamId: 81,
          createdBy: 'invalid',
          summary: 'A reason that is totally valid',
          carePackage: 'look after them',
          ragRating: 'purple',
          allocationDate: new Date(Date.parse('2022-01-27 15:33:13.839')),
        })
      ).rejects.toThrow(
        'createdBy must be a `number` type, but the final value was: `NaN` (cast from the value `"invalid"`).'
      );
    });
  });
  describe('when the summary is invalid', () => {
    test('validation throws an error', async () => {
      await expect(
        allocateResidentSchema.validate({
          personId: 3057982,
          allocatedTeamId: 81,
          createdBy: 93,
          summary: null,
          carePackage: 'look after them',
          ragRating: 'purple',
          allocationDate: new Date(Date.parse('2022-01-27 15:33:13.839')),
        })
      ).rejects.toThrow(
        'summary must be a `string` type, but the final value was: `null`.\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`'
      );
    });
  });
  describe('when the carePackage is invalid', () => {
    test('validation throws an error', async () => {
      await expect(
        allocateResidentSchema.validate({
          personId: 3057982,
          allocatedTeamId: 81,
          createdBy: 93,
          summary: 'A reason that is totally valid',
          carePackage: null,
          ragRating: 'purple',
          allocationDate: new Date(Date.parse('2022-01-27 15:33:13.839')),
        })
      ).rejects.toThrow(
        'carePackage must be a `string` type, but the final value was: `null`.\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`'
      );
    });
  });
  describe('when the ragRating is invalid', () => {
    test('validation throws an error', async () => {
      await expect(
        allocateResidentSchema.validate({
          personId: 3057982,
          allocatedTeamId: 81,
          createdBy: 93,
          summary: 'A reason that is totally valid',
          carePackage: 'look after them',
          ragRating: 'invalid',
          allocationDate: new Date(Date.parse('2022-01-27 15:33:13.839')),
        })
      ).rejects.toThrow(
        'ragRating must be one of the following values: purple, red, amber, green'
      );
    });
  });
  describe('when the allocationDate is invalid', () => {
    test('validation throws an error', async () => {
      await expect(
        allocateResidentSchema.validate({
          personId: 3057982,
          allocatedTeamId: 81,
          createdBy: 93,
          summary: 'A reason that is totally valid',
          carePackage: 'look after them',
          ragRating: 'purple',
          allocationDate: 'tomorrow',
        })
      ).rejects.toThrow(
        'allocationDate must be a `date` type, but the final value was: `Invalid Date` (cast from the value `"tomorrow"`).'
      );
    });
  });
});
describe('allocating a resident to a team', () => {
  beforeAll(async () => {
    (axios.post as jest.Mock).mockClear();
    await allocateResident({
      allocatedTeamId: 10,
      allocationDate: new Date('2022-01-27T15:33:13.839Z'),
      carePackage: 'look after them',
      createdBy: 34,
      personId: 4938745,
      ragRating: 'purple',
      summary: 'a summary',
    });
  });
  test('post request to the expected endpoint', () => {
    expect(axios.post).toHaveBeenCalledWith(`https://test-api/allocations`);
  });
});
