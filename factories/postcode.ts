import { Factory } from 'fishery';
import { AddressWrapper, Address } from 'types';
import { AddressAPI } from 'utils/api/postcodeAPI';

interface AddressAPIWrapper {
  address: AddressAPI[];
  page_count: number;
}

export const addressFactory = Factory.define<Address>(() => ({
  address: 'street address',
  postcode: 'test postcode',
  uprn: 'test uprn',
}));

export const addressWrapperFactory = Factory.define<AddressWrapper>(() => ({
  address: [addressFactory.build()],
  page_count: 1,
}));

export const addressAPIWrapperFactory = Factory.define<AddressAPIWrapper>(
  () => ({
    address: [addressAPIFactory.build()],
    page_count: 1,
  })
);

export const addressAPIFactory = Factory.define<AddressAPI>(() => ({
  postcode: 'test postcode',
  UPRN: 'test UPRN',
  town: 'test town',
  line1: 'test line1',
}));
