import { render, fireEvent } from '@testing-library/react';

import PersonDetails from './PersonDetails';

import { residentFactory } from 'factories/residents';

describe('PersonDetails component', () => {
  const props = {
    person: residentFactory.build({
      firstName: 'i am the first',
      lastName: 'i am the last',
      otherNames: [{ firstName: 'asd', lastName: 'qwe' }],
      dateOfBirth: '1978-02-23T00:00:00',
      dateOfDeath: '1998-02-23T00:00:00',
      nhsNumber: 123,
      ethnicity: 'B.B2',
      gender: 'U',
      address: { address: 'new adress', postcode: 'E5 0PU' },
      sexualOrientation: 'straight',
      emailAddress: 'test@test.com',
      preferredMethodOfContact: 'email',
      phoneNumbers: [
        {
          number: '02123',
          type: 'Home',
        },
      ],
    }),
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
