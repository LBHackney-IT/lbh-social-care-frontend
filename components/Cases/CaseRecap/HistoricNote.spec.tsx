import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';
import * as casesAPI from 'utils/api/cases';
import HistoricNote from './HistoricNote';

import { mockedHistoricCaseNote } from 'fixtures/cases.fixtures';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`HistoricNote`, () => {
  it('should display historic case note', async () => {
    const props = {
      recordId: '123',
      is_historical: true,
      personId: 123,
    };
    jest.spyOn(casesAPI, 'useCaseNote').mockImplementation(() => ({
      data: mockedHistoricCaseNote,
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
        <HistoricNote {...props} />
      </UserContext.Provider>
    );
    expect(queryByText('Foo Bar')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
