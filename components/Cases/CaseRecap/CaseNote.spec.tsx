import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';
import * as casesAPI from 'utils/api/cases';
import CaseNote from './CaseNote';

import { mockedCaseNote } from 'fixtures/cases.fixtures';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`CaseNote`, () => {
  it('should display case note', async () => {
    const props = {
      recordId: '123',
      is_historical: false,
      personId: 123,
    };
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
        <CaseNote {...props} />
      </UserContext.Provider>
    );
    expect(queryByText('Foo bar')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
