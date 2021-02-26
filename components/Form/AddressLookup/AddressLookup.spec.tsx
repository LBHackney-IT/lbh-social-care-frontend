import { defaultValidation } from './AddressLookup';

describe('AddressLookup', () => {
  describe('defaultValidation', () => {
    it('should work properly - if not required', () => {
      const validate = defaultValidation();
      expect(validate.address()).toBe(true);
      expect(validate.address({ address: '' })).toBe(true);
      expect(validate.address({ address: 'foo' })).toBe(true);
      expect(validate.postcode()).toBe(true);
      expect(validate.postcode({ postcode: '' })).toBe(true);
      expect(validate.postcode({ postcode: 'foo' })).toBe(
        'You must enter a valid postcode'
      );
      expect(validate.postcode({ postcode: 'e83as' })).toBe(true);
    });

    it('should work properly - if required', () => {
      const validate = defaultValidation({ required: true });
      expect(validate.address()).toBe('You must enter an address');
      expect(validate.address({ address: '' })).toBe(
        'You must enter an address'
      );
      expect(validate.address({ address: 'foo' })).toBe(true);
      expect(validate.postcode()).toBe('You must enter a valid postcode');
      expect(validate.postcode({ postcode: '' })).toBe(
        'You must enter a valid postcode'
      );
      expect(validate.postcode({ postcode: 'foo' })).toBe(
        'You must enter a valid postcode'
      );
      expect(validate.postcode({ postcode: 'e83as' })).toBe(true);
    });
  });
});
