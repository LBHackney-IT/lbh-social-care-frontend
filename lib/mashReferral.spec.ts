import axios from 'axios';
import * as mashReferralAPI from './mashReferral';
import { mockedMashReferral } from 'factories/mashReferral';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');

describe('mash referral APIs', () => {
  describe('getAllMashReferrals', () => {
    it("calls the service API's mashReferral endpoint", async () => {
      mockedAxios.get.mockResolvedValue({
        data: [mockedMashReferral],
      });

      const data = await mashReferralAPI.getAllMashReferrals();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${ENDPOINT_API}/mash-referral`,
        { headers: { 'x-api-key': AWS_KEY } }
      );
      expect(data).toEqual([mockedMashReferral]);
    });
  });
});
