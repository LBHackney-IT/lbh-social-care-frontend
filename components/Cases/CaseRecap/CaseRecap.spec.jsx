import { act, render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { useCase } from 'utils/api/cases';
import CaseRecap from './CaseRecap';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock('utils/api/cases', () => ({
  useCase: jest.fn(),
}));

describe(`CaseRecap`, () => {
  const props = {
    recordId: '123',
    personId: '123',
  };
  it('should update the queryString on search and run a new search - with load more', async () => {
    useCase.mockImplementation(() => ({
      data: {
        caseFormTimestamp: '2021-02-26T16:48:29.093Z',
        officerEmail: 'foo@bar.com',
        caseFormData: {
          case_note_description: 'Foo bar',
          case_note_title: 'Foo',
          date_of_event: '2020-06-05',
          first_name: 'Bar',
          form_name: 'Foo',
          form_name_overall: 'ASC_case_note',
        },
      },
    }));
    const { asFragment, queryByText } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo' },
        }}
      >
        <CaseRecap {...props} />
      </UserContext.Provider>
    );

    await act(async () => {
      expect(queryByText('Foo bar')).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
