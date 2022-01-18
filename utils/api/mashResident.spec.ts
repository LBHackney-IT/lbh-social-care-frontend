import axios from 'axios';
import * as mashResidentAPI from './mashResident';
import { UpdateMashResidentData } from 'types';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('mashResidentAPI', () => {
  describe('updateMashResident', () => {
    it('calls the PATCH Mash resident endpoint', async () => {
      const updateMashResidentDetails: UpdateMashResidentData = {
        id: 345,
        socialCareId: 23,
        updateType: null,
      };
      jest.spyOn(axios, 'patch');
      const mashResidentId = updateMashResidentDetails.id;

      await mashResidentAPI.updateMashResident(
        updateMashResidentDetails,
        mashResidentId
      );

      expect(axios.patch).toHaveBeenCalledWith(
        `/api/mash-resident/${mashResidentId}`,
        updateMashResidentDetails
      );
    });

    it('returns the response from the PATCH Mash resident endpoint when updated', async () => {
      const updateMashResidentDetails: UpdateMashResidentData = {
        id: 345,
        socialCareId: 23,
        updateType: null,
      };

      const mockApiResponse = { data: 'baz' };

      mockedAxios.patch.mockResolvedValue(mockApiResponse);

      const mashResidentId = updateMashResidentDetails.id;

      const response = await mashResidentAPI.updateMashResident(
        updateMashResidentDetails,
        mashResidentId
      );

      expect(response).toBe(mockApiResponse.data);
    });
  });
});
