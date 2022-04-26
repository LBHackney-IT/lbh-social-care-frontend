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

export const addressesAPIWrapperFactory = Factory.define<AddressAPIWrapper>(
  () => ({
    address: [addressAPIFactory.build(), addressesAPIFactory.build()],
    page_count: 1,
  })
);

export const addressAPIFactory = Factory.define<AddressAPI>(() => ({
  postcode: 'test postcode',
  UPRN: 'test UPRN',
  town: 'test town',
  line1: 'test line1',
}));

export const addressesAPIFactory = Factory.define<AddressAPI>(() => ({
  postcode: 'test postcode 2',
  UPRN: 'test UPRN 2',
  town: 'test town 2',
  line1: 'test line1 2',
}));
