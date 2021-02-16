import axios from 'axios';

import * as residentsAPI from './residents';

jest.mock('axios');

const { ENDPOINT_API, AWS_KEY } = process.env;

const residentResponse = {
  name: 'foo',
  addressList: [
    {
      endDate: '2004-11-30T00:00:00Z',
      contactAddressFlag: 'N',
      displayAddressFlag: 'N',
      addressLine1: '1 line',
      addressLine2: null,
      addressLine3: null,
      postCode: 'E5 0PU',
    },
    {
      endDate: '2014-02-11T00:00:00Z',
      contactAddressFlag: 'N',
      displayAddressFlag: 'N',
      addressLine1: '2 line',
      addressLine2: null,
      addressLine3: null,
      postCode: 'N17 9RP',
    },
    {
      endDate: null,
      contactAddressFlag: 'Y',
      displayAddressFlag: 'Y',
      addressLine1: 'valid line',
      addressLine2: null,
      addressLine3: null,
      postCode: 'SE9 4RZ',
    },
  ],
};

describe('residents APIs', () => {
  describe('getResidents', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({
        data: { foo: 123, residents: [residentResponse] },
      });
      const data = await residentsAPI.getResidents({
        foo: 'bar',
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/residents`);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({
        foo: 123,
        residents: [
          {
            name: 'foo',
            restricted: false,
            address: { address: 'valid line', postcode: 'SE9 4RZ' },
          },
        ],
      });
    });
  });

  describe('getResident', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({
        data: {
          residents: [{ name: 'foobar', restricted: 'Y' }, { name: 'barfoo' }],
        },
      });
      const data = await residentsAPI.getResident('foo', { bar: 'foobar' });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/residents`);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(axios.get.mock.calls[0][1].params).toEqual({
        mosaic_id: 'foo',
        bar: 'foobar',
      });
      expect(data).toEqual({
        name: 'foobar',
        restricted: true,
        address: undefined,
      });
    });
  });

  describe('addResident', () => {
    it('should work properly', async () => {
      axios.post.mockResolvedValue({ data: { _id: 'foobar' } });
      const data = await residentsAPI.addResident({ foo: 'bar' });
      expect(axios.post).toHaveBeenCalled();
      expect(axios.post.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/residents`);
      expect(axios.post.mock.calls[0][1]).toEqual({ foo: 'bar' });
      expect(axios.post.mock.calls[0][2].headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ _id: 'foobar' });
    });
  });
});
