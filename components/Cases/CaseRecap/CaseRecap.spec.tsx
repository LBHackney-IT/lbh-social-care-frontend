import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';
import * as casesAPI from 'utils/api/cases';
import CaseRecap from './CaseRecap';

import { mockedCaseNote } from 'fixtures/cases.fixtures';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`CaseRecap`, () => {
  const props = {
    recordId: '123',
    personId: 123,
  };
  it('should update the queryString on search and run a new search - with load more', async () => {
    jest.spyOn(casesAPI, 'useCase').mockImplementation(() => ({
      data: mockedCaseNote,
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    const { asFragment, queryByText } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <CaseRecap {...props} />
      </UserContext.Provider>
    );
    expect(queryByText('Foo bar')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
