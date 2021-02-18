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
    address: { address: 'new adress', postCode: 'E5 0PU' },
    sexualOrientation: 'straight',
    email: 'test@test.com',
    preferredMethodOfContact: 'email',
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
