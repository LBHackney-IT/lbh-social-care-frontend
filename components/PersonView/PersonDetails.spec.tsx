import { render } from '@testing-library/react';

import PersonDetails from './PersonDetails';

import { residentFactory } from 'factories/residents';
import { AuthProvider } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';

import Router from 'next/router';

jest.mock('next/router', () => ({
  __esModule: true,
  default: {
    events: {
      on: jest.fn(),
    },
    push: jest.fn(),
  },
  useRouter: () => ({
    query: { foo: 'bar' },
    replace: jest.fn(),
    pathname: 'foopath',
  }),
}));

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
    const { asFragment } = render(
      <AuthProvider user={{ ...mockedUser }}>
        <PersonDetails {...props} />
      </AuthProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
