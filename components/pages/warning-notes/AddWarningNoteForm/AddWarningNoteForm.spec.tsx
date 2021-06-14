import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { residentFactory } from 'factories/residents';
import { Resident } from 'types';
import { AddWarningNoteForm } from './AddWarningNoteForm';
import PersonView from '../../../PersonView/PersonView';
import { AuthProvider } from '../../../UserContext/UserContext';
import { mockedUser } from '../../../../factories/users';

const setDateFieldValue = (
  fieldName: string,
  date: Date | { date: string; month: string; year: string }
) => {
  fireEvent.change(
    screen.getByLabelText('Day', {
      selector: `[name='${fieldName}-day']`,
    }),
    {
      target: {
        value:
          date instanceof Date
            ? String(date.getDate()).padStart(2, '0')
            : date.date,
      },
    }
  );
  fireEvent.change(
    screen.getByLabelText('Month', {
      selector: `[name='${fieldName}-month']`,
    }),
    {
      target: {
        value:
          date instanceof Date
            ? String(date.getMonth() + 1).padStart(2, '0')
            : date.month,
      },
    }
  );
  fireEvent.change(
    screen.getByLabelText('Year', {
      selector: `[name='${fieldName}-year']`,
    }),
    {
      target: {
        value: date instanceof Date ? String(date.getFullYear()) : date.year,
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

const mockedAdultsResident = residentFactory.build({
  contextFlag: 'A',
});

const mockedChildrensResident = residentFactory.build({
  contextFlag: 'C',
});

const createMockedPersonView = (resident: Resident) => {
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
      createMockedPersonView(mockedAdultsResident)
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
      createMockedPersonView(mockedChildrensResident)
    );

    const { asFragment } = render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should show an error message if a warning type is not selected', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

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
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

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
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

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
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

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
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

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
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    setDateFieldValue('startDate', new Date('2021-01-01'));
    setDateFieldValue('reviewDate', new Date('2022-01-02')); // One year and one day later

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText(
        'Review / end date cannot be more than 1 year after the Start date.',
        { selector: '.govuk-error-message' }
      );
    });
  });

  it('should show an error message if a disclosure with individual value is not selected', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Select an answer for this input');
    });
  });

  it("should show an error message if a disclosure with individual value is selected and an informed date isn't entered", async () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.click(
      screen.getByText('Yes', {
        selector: "[for='disclosedWithIndividual_Yes']",
      })
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Enter a date informed');
    });
  });

  it('should show an error message if a disclosure with individual value is selected and an invalid informed date is entered', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.click(
      screen.getByText('Yes', {
        selector: "[for='disclosedWithIndividual_Yes']",
      })
    );

    setDateFieldValue('disclosedDate', {
      date: '56',
      month: '15',
      year: '10',
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Must be a valid Date');
    });
  });

  it('should show an error message if a disclosure with individual value is selected and no inform method is selected', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.click(
      screen.getByText('Yes', {
        selector: "[for='disclosedWithIndividual_Yes']",
      })
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Select how the individual was informed');
    });
  });

  it('should show an error message if a disclosure with individual value is selected and no details are entered', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.click(
      screen.getByText('Yes', {
        selector: "[for='disclosedWithIndividual_Yes']",
      })
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Enter details of disclosure to individual');
    });
  });

  it('should show an error message if notes are not entered', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Enter warning narrative and risks notes');
    });
  });

  it("should show an error message if a manager's name is not entered", async () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Enter a manager’s name');
    });
  });

  it('should show an error message if a manager discussion date is not entered', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Enter a date discussed with manager');
    });
  });

  it('should show an error message if the manager discussion date entered is invalid', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    setDateFieldValue('discussedWithManagerDate', {
      date: '56',
      month: '15',
      year: '10',
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText('Must be a valid Date', {
        selector: '.govuk-error-message',
      });
    });
  });

  it('should show an error message if the manager discussion date entered is in the future', async () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(mockedAdultsResident)
    );

    render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    const today = new Date();

    setDateFieldValue(
      'discussedWithManagerDate',
      new Date(`${today.getFullYear() + 2}-01-01`)
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      screen.getByText("Date discussed with manager can't be in the future", {
        selector: '.govuk-error-message',
      });
    });
  });
});
