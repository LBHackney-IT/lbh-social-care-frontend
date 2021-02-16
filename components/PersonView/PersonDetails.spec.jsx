import { render, fireEvent } from '@testing-library/react';

import PersonDetails from './PersonDetails';

describe('PersonDetails component', () => {
  const props = {
    otherNames: [{ firstName: 'asd', laseName: 'qwe' }],
    ageContext: 'CFS',
    firstName: 'i am the first',
    lastName: 'i am the last',
    mosaicId: 'mosaic',
    dateOfBirth: '1978-02-23T00:00:00.0000000',
    dateOfDeath: '1998-02-23T00:00:00.0000000',
    nhsNumber: 'nhs_123',
    ethnicity: 'White',
    gender: 'X',
    sexualOrientation: 'straight',
    email: 'test@test.com',
    preferredMethodOfContact: 'email',
    addressList: [
      {
        contactAddressFlag: 'N',
        displayAddressFlag: 'N',
        addressLine1: 'old adress',
        addressLine2: null,
        addressLine3: null,
        postCode: 'E5 0PU',
      },
      {
        contactAddressFlag: 'N',
        displayAddressFlag: 'Y',
        addressLine1: 'new adress',
        addressLine2: null,
        addressLine3: null,
        postCode: 'E5 0PU',
      },
    ],
    phoneNumber: [
      {
        phoneNumber: '02123',
        phoneType: 'Home',
      },
    ],
  };

  it('should render properly', () => {
    const { asFragment } = render(<PersonDetails {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly - expanded', async () => {
    const { asFragment, getByRole } = render(
      <PersonDetails {...props} expandView />
    );
    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(getByRole('button'));
    expect(asFragment()).toMatchSnapshot();
  });
});
