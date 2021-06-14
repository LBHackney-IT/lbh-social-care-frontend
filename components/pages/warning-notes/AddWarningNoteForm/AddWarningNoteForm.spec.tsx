import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { residentFactory } from 'factories/residents';
import { Resident } from 'types';
import { AddWarningNoteForm } from './AddWarningNoteForm';
import PersonView from '../../../PersonView/PersonView';
import { AuthProvider } from '../../../UserContext/UserContext';
import { mockedUser } from '../../../../factories/users';

const setDateFieldValue = (fieldName: string, date: Date) => {
  fireEvent.change(
    screen.getByLabelText('Day', {
      selector: `[name='${fieldName}-day']`,
    }),
    {
      target: {
        value: String(date.getDate()).padStart(2, '0'),
      },
    }
  );
  fireEvent.change(
    screen.getByLabelText('Month', {
      selector: `[name='${fieldName}-month']`,
    }),
    {
      target: {
        value: String(date.getMonth() + 1).padStart(2, '0'),
      },
    }
  );
  fireEvent.change(
    screen.getByLabelText('Year', {
      selector: `[name='${fieldName}-year']`,
    }),
    {
      target: {
        value: String(date.getFullYear()),
      },
    }
  );
};

jest.mock('../../../PersonView/PersonView');

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

const createMockedPersonView = (
  resident: Resident = residentFactory.build()
) => {
  const MockedPersonView = ({
    children,
  }: {
    children: (resident: Resident) => React.ComponentType;
  }) => {
    return <>{children(resident)}</>;
  };

  return MockedPersonView;
};

describe('<AddWarningNoteForm />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the warning notes form for an adults resident', () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(
        residentFactory.build({
          contextFlag: 'A',
        })
      )
    );

    const { asFragment } = render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the warning notes form for a childrens resident', () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(
        residentFactory.build({
          contextFlag: 'C',
        })
      )
    );

    const { asFragment } = render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should show an error message if a warning type is not selected', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(createMockedPersonView());

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Select a warning type');
    });
  });

  it('should show an error message if a warning type is not selected', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(createMockedPersonView());

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Select a warning type');
    });
  });

  it('should show an error message if a start date is not entered', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(createMockedPersonView());

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Enter a start date');
    });
  });

  it('should show an error message if the start date entered is in the future', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(createMockedPersonView());

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    const today = new Date();

    setDateFieldValue(
      'startDate',
      new Date(`${today.getFullYear() + 2}-01-01`)
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText("Start date can't be in the future", {
        selector: '.govuk-error-message',
      });
    });
  });

  it('should show an error message if a review / end date is not entered', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(createMockedPersonView());

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Enter a review / end date');
    });
  });

  it('should show an error message if the review / end date entered is more than one year after the entered start date', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(createMockedPersonView());

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    setDateFieldValue('startDate', new Date('2021-01-01'));
    setDateFieldValue('reviewDate', new Date('2023-01-01'));

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText(
        'Review / end date cannot be more than 1 year after the Start date.',
        { selector: '.govuk-error-message' }
      );
    });
  });
});
