import { defaultValidation } from './AddressLookup';
import AddressLookupWrapper from './AddressLookupWrapper';
import { AddressBox } from './AddressLookup';
import { render } from '@testing-library/react';

describe('AddressLookup', () => {
  describe('defaultValidation', () => {
    describe('for address', () => {
      let validate: {
        address: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'You must enter an address';
        postcode: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'You must enter a valid postcode';
        buildingNumber: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'Building number must use valid characters (0-9)';
      };

      beforeEach(() => {
        validate = defaultValidation();
        return validate;
      });

      it('when validation is not required should return true when address has no value', () => {
        expect(validate.address()).toBe(true);
      });

      it('when validation is not required should return true when address is empty string', () => {
        expect(validate.address({ address: '' })).toBe(true);
      });

      it('when validation is not required should return true when address is a non empty string', () => {
        expect(validate.address({ address: 'foo' })).toBe(true);
      });

      it('when validation is required should show message when address has no value', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.address()).toBe('You must enter an address');
        expect(validate.address({ address: '' })).toBe(
          'You must enter an address'
        );
        expect(validate.address({ address: 'foo' })).toBe(true);
      });

      it('when validation is required should show message when address is an empty string', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.address({ address: '' })).toBe(
          'You must enter an address'
        );
        expect(validate.address({ address: 'foo' })).toBe(true);
      });

      it('when validation is required should return true when address is a non empty string', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.address({ address: 'foo' })).toBe(true);
      });
    });

    describe('for postcode', () => {
      let validate: {
        address: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'You must enter an address';
        postcode: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'You must enter a valid postcode';
        buildingNumber: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'Building number must use valid characters (0-9)';
      };

      beforeEach(() => {
        validate = defaultValidation();
        return validate;
      });

      it('when validation is not required should return true when postcode has no value', () => {
        expect(validate.postcode()).toBe(true);
      });

      it('when validation is not required should return true when postcode is empty string', () => {
        expect(validate.postcode({ postcode: '' })).toBe(true);
      });

      it('when validation is not required should return error message when postcode is incorrect format', () => {
        expect(validate.postcode({ postcode: 'foo' })).toBe(
          'You must enter a valid postcode'
        );
      });

      it('when validation is not required should return true when postcode is the correct format', () => {
        expect(validate.postcode({ postcode: 'e83as' })).toBe(true);
      });

      it('when validation is required should show message when postcode has no value', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.postcode()).toBe('You must enter a valid postcode');
      });

      it('when validation is required should return error message when postcode is empty string', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.postcode({ postcode: '' })).toBe(
          'You must enter a valid postcode'
        );
      });

      it('when validation is required should return error message when postcode is incorrect format', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.postcode({ postcode: 'foo' })).toBe(
          'You must enter a valid postcode'
        );
      });

      it('when validation is required should return true when postcode is the correct format', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.postcode({ postcode: 'e83as' })).toBe(true);
      });
    });

    describe('for building number', () => {
      let validate: {
        address: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'You must enter an address';
        postcode: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'You must enter a valid postcode';
        buildingNumber: (
          arg0?: Partial<AddressBox['value']>
        ) => true | 'Building number must use valid characters (0-9)';
      };

      beforeEach(() => {
        validate = defaultValidation();
        return validate;
      });

      it('when validation is not required should return true if building number has no value', () => {
        expect(validate.buildingNumber()).toBe(true);
      });

      it('when validation is not required should return true if building number is empty string', () => {
        expect(validate.buildingNumber({ buildingNumber: '' })).toBe(true);
      });

      it('when validation is not required should return true if building number is non empty string', () => {
        expect(validate.buildingNumber({ buildingNumber: 'foo' })).toBe(true);
      });

      it('when validation is not required should return true if building number is all numeric format', () => {
        const validate = defaultValidation();
        expect(validate.buildingNumber({ buildingNumber: '123' })).toBe(true);
      });

      it('when validation is required should show error message when building number has no value', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.buildingNumber()).toBe(
          'Building number must use valid characters (0-9)'
        );
      });

      it('when validation is required should show error message when building number is empty string', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.buildingNumber({ buildingNumber: '' })).toBe(
          'Building number must use valid characters (0-9)'
        );
      });

      it('when validation is required should show error message when building number is non numeric', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.buildingNumber({ buildingNumber: '123a' })).toBe(
          'Building number must use valid characters (0-9)'
        );
      });

      it('when validation is required should return true when building number is numeric', () => {
        const validate = defaultValidation({ required: true });
        expect(validate.buildingNumber({ buildingNumber: '123' })).toBe(true);
      });
    });
  });

  describe('Address search functionality', () => {
    describe('Use AddressLookup to search Hackney address api', () => {
      it('using a building number & postcode', async () => {
        const { queryByTestId, queryByText, getByTestId } = render(
          <AddressLookupWrapper
            postcode="SW1A 0AA"
            buildingNumber="1"
            name="name"
            label="labe"
            hint="hint"
          />
        );
        const postcodeInput = getByTestId('postcode') as HTMLInputElement;
        const buildingNumberInput = getByTestId(
          'building-number'
        ) as HTMLInputElement;
        console.log('postcodeInput Value', postcodeInput.value);

        expect(postcodeInput.value).toMatch('SW1A 0AA');
        expect(buildingNumberInput.value).toMatch('1');

        // cy.visitAs(`/people/add`, AuthRoles.ChildrensGroup);
        // cy.get(`input[id=building-number]`).click().type('1');
        // cy.get(`input[id=postcode]`).click().type('SW1A 0AA');
        // cy.get(`button[id=lookup-button]`).click();
        // cy.get(`select[id=address]`).should('be.visible');
        // cy.get(`select[id=address]`)
        //   .select('THE SPEAKERS HOUSE, 1 PARLIAMENT SQUARE')
        //   .should('have.text', 'THE SPEAKERS HOUSE, 1 PARLIAMENT SQUARE');
      });

      // it('checks lookup button calls postcode api correctly', async () => {

      //   jest.spyOn(postcodeApi, 'lookupPostcode').mockImplementation(() => ({
      //     data: [],
      //     isValidating: false,
      //     mutate: jest.fn(),
      //     revalidate: jest.fn(),
      //   }));

      //   const { queryByTestId, queryByText, getByTestId } = render(
      //     <AddressLookupWrapper
      //       postcode="SW1A 0AA"
      //       buildingNumber="1"
      //       name="name"
      //       label="labe"
      //       hint="hint"
      //     />
      //   );
      //   const postcodeInput = getByTestId('postcode') as HTMLInputElement;
      //   const buildingNumberInput = getByTestId(
      //     'building-number'
      //   ) as HTMLInputElement;
      //   console.log('postcodeInput Value', postcodeInput.value);

      //   expect(postcodeInput.value).toMatch('SW1A 0AA');
      //   expect(buildingNumberInput.value).toMatch('1');
      // });
    });
  });
});
