import { Factory } from 'fishery';
import { AddressWrapper, Address } from 'types';

export const addressFactory = Factory.define<Address>(() => ({
  address: 'address',
  postcode: 'string',
  uprn: 'string',
}));

export const addressWrapperFactory = Factory.define<AddressWrapper>(() => ({
  address: [addressFactory.build()],
  page_count: 1,
}));
