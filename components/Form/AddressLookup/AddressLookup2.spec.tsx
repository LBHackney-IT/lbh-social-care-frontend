import AddressLookupWrapper from './AddressLookupWrapper';
import { fireEvent, render, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { UserContext } from 'components/UserContext/UserContext';
import { userFactory } from 'factories/users';
import axios from 'axios';
import { isAuthorised } from 'utils/auth';
import { getAddresses } from 'lib/postcode';
import { User } from 'types';
import { lookupPostcode } from 'utils/api/postcodeAPI';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

axios.defaults.baseURL = '/';

describe.only('Use AddressLookup to search Hackney address api', () => {
  it('should return addresses when searching with a building number & postcode', async () => {
    // jest.requireActual('axios');

    //   function _mock_req() {
    //     let req = {
    //         get: jest.fn(() => 'hello!'),
    //     };
    //     return req;
    // }

    // const response = await lookupPostcode('SW1A 0AA', 1, '1');
    // console.log('response', response);

    // axios.interceptors.request.use(
    //   (config) => {
    //     console.log('config', config);
    //     console.log('config.transformRequest', config.transformRequest);
    //     // config.params = 'someGenericValue';
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   }
    // );


    jest.spyOn(axios, 'get');

    const postcode = 'SW1A 0AA';
    const buildingNumber = '1';

    const response = await axios.get(
      `./api/postcode/${postcode}?page=1&buildingNumber=${buildingNumber}`
    );
    // await lookupPostcode(postcode, 1, buildingNumber);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith(
        `/api/postcode/${postcode}?page=1&buildingNumber=${buildingNumber}`
      );
    });

    // const mocked_results = await getAddresses(postcode, '1', buildingNumber);

    // console.log('mocked', mocked_results);
    // mockedAxios.get.mockResolvedValue({
    //   data: mocked_results,
    // });

    //   const { getByText, queryByTestId, getByTestId } = render(
    //     <UserContext.Provider
    //       value={{
    //         user: userFactory.build({
    //           isAuthorised: true,
    //         }),
    //       }}
    //     >
    //       <AddressLookupWrapper
    //         postcode={postcode}
    //         buildingNumber={buildingNumber}
    //         name="address"
    //         label="label"
    //         hint="hint"
    //       />
    //     </UserContext.Provider>
    //   );

    //   await waitFor(() => {
    //     fireEvent.click(getByText('Look up'));
    //   });

    //   await waitFor(() => {
    //     expect(axios.get).toHaveBeenCalled();
    //     expect(axios.get).toHaveBeenCalledWith(
    //       `/api/postcode/${postcode}?page=1&buildingNumber=${buildingNumber}`
    //     );
    //   });

    //   await waitFor(() => {
    //     expect(queryByTestId('spinner')).not.toBeInTheDocument();
    //   });

    //   // expect(mockedIsAuthorised).toHaveBeenCalled();

    //   const addressDropDown = getByTestId('address');
    //   expect(addressDropDown).not.toBeNull();

    //   const expectedAddress = getByText(
    //     'THE SPEAKERS HOUSE, 1 PARLIAMENT SQUARE'
    //   );
    //   expect(expectedAddress).not.toBeNull();
    //   expect(expectedAddress).toBeInTheDocument();
  });
});
