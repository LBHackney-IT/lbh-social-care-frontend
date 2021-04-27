import axios from 'axios';

import * as warningNotesAPI from './warningNotes';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const { ENDPOINT_API, AWS_KEY } = process.env;

describe('warningNotesAPI', () => {
  describe('addWarningNote', () => {
    it('should work properly', async () => {
      mockedAxios.post.mockResolvedValue({ data: {} });
      await warningNotesAPI.addWarningNote({
        createdBy: 'foo@bar.com',
      });
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/warningnotes`
      );
      expect(mockedAxios.post.mock.calls[0][1]).toEqual({
        createdBy: 'foo@bar.com',
      });
      expect(mockedAxios.post.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
    });

    it('should throw an error with the wrong body', async () => {
      try {
        // @ts-expect-error check validation
        await warningNotesAPI.addWarningNote(123);
      } catch (e) {
        expect(e.name).toEqual('ValidationError');
      }
    });
  });

  describe('getWarningNoteByResident', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { warningNotes: ['foo'] },
      });
      const data = await warningNotesAPI.getWarningNotesByResident(123);
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/residents/123/warningnotes`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual(['foo']);
    });
  });
});
