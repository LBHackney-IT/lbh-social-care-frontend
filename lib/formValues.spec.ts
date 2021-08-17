import axios from 'axios';
import * as caseStatusAPI from './formValues';
import { mockedFormValue } from 'factories/formTypes';

const ENDPOINT_API =
  'https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0';
// const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');

describe('case form values APIs', () => {
  describe('GetFormValues', () => {
    it("calls the service API's form values endpoint", async () => {
      mockedAxios.get.mockResolvedValue({
        data: mockedFormValue,
      });

      const data = await caseStatusAPI.GetFormValues('CIN');

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/case-status/form-options/CIN`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });

      expect(data).toEqual(mockedFormValue);
    });
  });
});
