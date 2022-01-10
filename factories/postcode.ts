import { Factory } from 'fishery';
import { AddressAPI } from 'utils/api/postcodeAPI';

interface AddressAPIWrapper {
  address: AddressAPI[];
  page_count: number;
}

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
