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

export const addressesAPI3and4WrapperFactory =
  Factory.define<AddressAPIWrapper>(() => ({
    address: [address3APIFactory.build(), address4APIFactory.build()],
    page_count: 2,
  }));

export const address3APIFactory = Factory.define<AddressAPI>(() => ({
  postcode: 'test postcode 3',
  UPRN: 'test UPRN 3',
  town: 'test town 3',
  line1: 'test line1 3',
}));

export const address4APIFactory = Factory.define<AddressAPI>(() => ({
  postcode: 'test postcode 4',
  UPRN: 'test UPRN 4',
  town: 'test town 4',
  line1: 'test line1 4',
}));
