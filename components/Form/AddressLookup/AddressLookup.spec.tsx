import { defaultValidation, AddressBox } from './AddressLookup';
import AddressLookupWrapper from './AddressLookupWrapper';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { addressAPIWrapperFactory } from 'factories/postcode';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AddressLookup', () => {
  describe('defaultValidation', () => {
    describe('when validation is not required', () => {
      let validate: {
        address: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'You must enter an address';
        postcode: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'You must enter a valid postcode';
      };

      beforeEach(() => {
        validate = defaultValidation();
        return validate;
      });

      it('should return true when address has no value', () => {
        expect(validate.address()).toBe(true);
      });

      it('should return true when address is empty string', () => {
        expect(validate.address({ address: '' })).toBe(true);
      });

      it('should return true when address is a non empty string', () => {
        expect(validate.address({ address: 'foo' })).toBe(true);
      });

      it('should return true when postcode has no value', () => {
        expect(validate.postcode()).toBe(true);
      });

      it('should return true when postcode is empty string', () => {
        expect(validate.postcode({ postcode: '' })).toBe(true);
      });

      it('should return error message when postcode is incorrect format', () => {
        expect(validate.postcode({ postcode: 'foo' })).toBe(
          'You must enter a valid postcode'
        );
      });

      it('should return true when postcode is the correct format', () => {
        expect(validate.postcode({ postcode: 'e83as' })).toBe(true);
      });
    });

    describe('when validation is required', () => {
      let validate: {
        address: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'You must enter an address';
        postcode: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'You must enter a valid postcode';
      };

      beforeEach(() => {
        validate = defaultValidation();
        return validate;
      });

      it('should show message when address has no value', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.address()).toBe('You must enter an address');
      });

      it('should show message when address is an empty string', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.address({ address: '' })).toBe(
          'You must enter an address'
        );
      });

      it('should return true when address is a non empty string', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.address({ address: 'foo' })).toBe(true);
      });

      it('should show message when postcode has no value', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.postcode()).toBe('You must enter a valid postcode');
      });

      it('should return error message when postcode is empty string', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.postcode({ postcode: '' })).toBe(
          'You must enter a valid postcode'
        );
      });

      it('should return error message when postcode is incorrect format', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.postcode({ postcode: 'foo' })).toBe(
          'You must enter a valid postcode'
        );
      });

      it('should return true when postcode is the correct format', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.postcode({ postcode: 'e83as' })).toBe(true);
      });
    });
  });

  describe('Address search functionality', () => {
    it('uses default values for building number & postcode when provided', async () => {
      const { getByTestId } = render(
        <AddressLookupWrapper
          postcode="SW1A 0AA"
          buildingNumber="1"
          name="name"
          label="label"
          hint="hint"
        />
      );
      const postcodeInput = getByTestId('postcode') as HTMLInputElement;
      const buildingNumberInput = getByTestId(
        'building-number'
      ) as HTMLInputElement;

      expect(postcodeInput.value).toMatch('SW1A 0AA');
      expect(buildingNumberInput.value).toMatch('1');
    });

    it('should throw an error when trying to search with no postcode or building number', async () => {
      const postcode = '';
      const building_number = '';

      const { getByText } = render(
        <AddressLookupWrapper
          postcode={postcode}
          buildingNumber={building_number}
          name="address"
          label="label"
          hint="hint"
        />
      );

      await waitFor(() => {
        fireEvent.click(getByText('Look up'));
      });

      const expectedError = getByText('You entered an invalid postcode.');
      expect(expectedError).not.toBeNull();
      expect(expectedError).toBeInTheDocument();
    });

    it('should throw an error when trying to search with only a building number', async () => {
      const postcode = '';
      const building_number = '1';

      const { getByText } = render(
        <AddressLookupWrapper
          postcode={postcode}
          buildingNumber={building_number}
          name="address"
          label="label"
          hint="hint"
        />
      );

      await waitFor(() => {
        fireEvent.click(getByText('Look up'));
      });

      const expectedError = getByText('You entered an invalid postcode.');
      expect(expectedError).not.toBeNull();
      expect(expectedError).toBeInTheDocument();
    });

    it('should throw an error when trying to search with a partial postcode', async () => {
      const postcode = 'SW1A';
      const building_number = '';

      const { getByText } = render(
        <AddressLookupWrapper
          postcode={postcode}
          buildingNumber={building_number}
          name="address"
          label="label"
          hint="hint"
        />
      );

      await waitFor(() => {
        fireEvent.click(getByText('Look up'));
      });

      const expectedError = getByText('You entered an invalid postcode.');
      expect(expectedError).not.toBeNull();
      expect(expectedError).toBeInTheDocument();
    });

    it('should throw an error when trying to search with a building number with letters', async () => {
      const postcode = 'SW1A 0AA';
      const building_number = '123A';

      const { getByText } = render(
        <AddressLookupWrapper
          postcode={postcode}
          buildingNumber={building_number}
          name="address"
          label="label"
          hint="hint"
        />
      );

      await waitFor(() => {
        fireEvent.click(getByText('Look up'));
      });

      const expectedError = getByText(
        'Building number must use valid characters (0-9)'
      );
      expect(expectedError).not.toBeNull();
      expect(expectedError).toBeInTheDocument();
    });

    it('checks lookup button calls postcode api correctly', async () => {
      const mocked_results = addressAPIWrapperFactory.build();
      mockedAxios.get.mockResolvedValue({
        data: mocked_results,
      });

      const postcode = 'SW1A 0AA';
      const building_number = '1';

      const { getByText, getByTestId } = render(
        <AddressLookupWrapper
          postcode={postcode}
          buildingNumber={building_number}
          name="address"
          label="label"
          hint="hint"
        />
      );

      await waitFor(() => {
        fireEvent.click(getByText('Look up'));
      });

      expect(axios.get).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith(
        `/api/postcode/${postcode}?page=1&buildingNumber=${building_number}`
      );

      const addressDropDown = getByTestId('address');
      expect(addressDropDown).not.toBeNull();
      expect(addressDropDown.childElementCount).toBe(
        mocked_results.address.length + 1
      );

      const expectedAddress = getByText('test line1');
      expect(expectedAddress).not.toBeNull();
      expect(expectedAddress).toBeInTheDocument();
    });

    it('checks postcode api errors are handled', async () => {
      const message = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(message));

      const { getByText } = render(
        <AddressLookupWrapper
          postcode="SW1A 0AA"
          buildingNumber="1"
          name="address"
          label="label"
          hint="hint"
        />
      );

      await waitFor(() => {
        fireEvent.click(getByText('Look up'));
      });

      const expectedAddress = getByText(
        'There was a problem with the postcode.'
      );
      expect(expectedAddress).not.toBeNull();
      expect(expectedAddress).toBeInTheDocument();
    });
  });
});
