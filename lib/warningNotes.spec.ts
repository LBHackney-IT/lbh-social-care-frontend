import axios from 'axios';

import * as warningNotesAPI from './warningNotes';

import { warningNoteFactory } from 'factories/warningNotes';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

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
      const openWarningNote = warningNoteFactory.build();
      const closedWarningNote = warningNoteFactory.build({ status: 'closed' });
      mockedAxios.get.mockResolvedValue({
        data: { warningNotes: [openWarningNote, closedWarningNote] },
      });
      const data = await warningNotesAPI.getWarningNotesByResident(123);
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/residents/123/warningnotes`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual([openWarningNote]);
    });
  });

  describe('updateWarningNote', () => {
    it('should work properly if the status is open', async () => {
      mockedAxios.patch.mockResolvedValue({ data: {} });
      await warningNotesAPI.updateWarningNote({
        status: 'Open',
        reviwedBy: 'foo@bar.com',
      });
      expect(mockedAxios.patch).toHaveBeenCalled();
      expect(mockedAxios.patch.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/warningnotes`
      );
      expect(mockedAxios.patch.mock.calls[0][1]).toEqual({
        status: 'Open',
        reviwedBy: 'foo@bar.com',
      });
      expect(mockedAxios.patch.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
    });

    it('should work properly if the status is closed', async () => {
      mockedAxios.patch.mockResolvedValue({ data: {} });
      await warningNotesAPI.updateWarningNote({
        status: 'Closed',
        endedBy: 'foo@bar.com',
      });
      expect(mockedAxios.patch).toHaveBeenCalled();
      expect(mockedAxios.patch.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/warningnotes`
      );
      expect(mockedAxios.patch.mock.calls[0][1]).toEqual({
        status: 'Closed',
        endedBy: 'foo@bar.com',
      });
      expect(mockedAxios.patch.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
    });

    it('should throw an error with the wrong body', async () => {
      try {
        // @ts-expect-error check validation
        await warningNotesAPI.updateWarningNote(123);
      } catch (e) {
        expect(e.name).toEqual('ValidationError');
      }
    });
  });
});
