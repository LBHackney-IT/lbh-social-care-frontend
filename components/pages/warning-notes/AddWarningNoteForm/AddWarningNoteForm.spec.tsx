import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { addDays, addMonths, addYears } from 'date-fns';
import Router from 'next/router';

import { residentFactory } from 'factories/residents';
import { Resident } from 'types';
import { AddWarningNoteForm } from './AddWarningNoteForm';
import PersonView from '../../../PersonView/PersonView';
import { AuthProvider } from '../../../UserContext/UserContext';
import { mockedUser } from '../../../../factories/users';

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

/**
 * Creates a mocked `<PersonView>` which our component is wrapped in internally
 *
 * @param {Resident} resident The resident to use for this <PersonView />
 *
 * @example
 *    createMockedPersonView(residentFactory.build());
 */
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

/**
 * Set the value of a date field
 *
 * @param {string} fieldName The name of the field to set the value on
 * @param {Date | { date: string; month: string; year: string }} date The date to set the form field to – use the non-Date type for setting invalid values
 *
 * @example
 *    setDateFieldValue("fieldName", new Date(2021-01-01));
 *    setDateFieldValue("fieldName", {
 *      date: "01",
 *      month: "01",
 *      year: "2021"
 *    });
 */
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

describe('<AddWarningNoteForm />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('for any resident (adults or childrens)', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      (PersonView as jest.Mock).mockImplementationOnce(
        createMockedPersonView(mockedAdultsResident)
      );

      renderResult = render(
        <AuthProvider user={mockedUser}>
          <AddWarningNoteForm personId={100} />
        </AuthProvider>
      );
    });

    it('should show an error message if a warning type is not selected', async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Select a warning type', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if a start date is not entered', async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Enter a start date', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if the start date entered is in the future', async () => {
      setDateFieldValue('startDate', addYears(new Date(), 2));

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText("Start date can't be in the future", {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if an invalid start date is entered', async () => {
      setDateFieldValue('startDate', {
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

    it('should show an error message if a review / end date is not entered', async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Enter a review / end date', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if an invalid review / end date is entered', async () => {
      setDateFieldValue('reviewDate', {
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

    it('should show an error message if the review / end date entered is more than one year after the entered start date', async () => {
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

    it('should show an error message if notes are not entered', async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Enter warning narrative and risks notes', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if the manager discussion date entered is invalid', async () => {
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
      setDateFieldValue('discussedWithManagerDate', addYears(new Date(), 1));

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText("Date discussed with manager can't be in the future", {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should push to the summary route when the form is submitted with valid data', async () => {
      setDateFieldValue('discussedWithManagerDate', addYears(new Date(), 1));

      // Warning type
      fireEvent.click(
        screen.getByText('Risk to Self', {
          selector: "[for='noteType_Risk to Self']",
        })
      );

      // Start date
      setDateFieldValue('startDate', new Date());

      // Review / end date
      setDateFieldValue('reviewDate', addMonths(new Date(), 1));

      // Is the individual aware?
      fireEvent.click(
        screen.getByText('Yes', {
          selector: "[for='disclosedWithIndividual_Yes']",
        })
      );

      // Date informed
      setDateFieldValue('disclosedDate', new Date());

      // How was the individual informed?
      fireEvent.click(
        screen.getByText('Verbal', {
          selector: "[for='disclosedHow_Verbal']",
        })
      );

      // Details of disclosure to individual
      fireEvent.change(
        screen.getByLabelText(/Details of disclosure to individual/),
        {
          target: {
            value: 'Some details',
          },
        }
      );

      // Warning narrative
      fireEvent.change(
        screen.getByLabelText(/Warning narrative and risks notes/),
        {
          target: {
            value: 'Some narrative',
          },
        }
      );

      // Manager's name
      fireEvent.change(screen.getByLabelText(/Manager’s name/), {
        target: {
          value: 'First Last',
        },
      });

      // Date discussed with manager
      setDateFieldValue('discussedWithManagerDate', new Date());

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        expect(Router.push).toHaveBeenCalledWith(
          '/people/100/warning-notes/add/[step]',
          '/people/100/warning-notes/add/summary'
        );
      });
    });

    it('should not push to the summary route if there are errors on the form', async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        expect(Router.push).not.toHaveBeenCalled();
      });
    });
  });

  describe('for an adults resident', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      (PersonView as jest.Mock).mockImplementationOnce(
        createMockedPersonView(mockedAdultsResident)
      );

      renderResult = render(
        <AuthProvider user={mockedUser}>
          <AddWarningNoteForm personId={100} />
        </AuthProvider>
      );
    });

    it('should render the warning notes form', () => {
      expect(renderResult.asFragment()).toMatchSnapshot();
    });

    it('should show an error message if a disclosure with individual value is not selected', async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Select an answer for this input', {
          selector: '.govuk-error-message',
        });
      });
    });

    it("should show an error message if a disclosure with individual value is selected as No and a justification for non-disclosure isn't entered", async () => {
      fireEvent.click(
        screen.getByText('No', {
          selector: "[for='disclosedWithIndividual_No']",
        })
      );

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText(
          'Enter justification for non-disclosure of warning note',
          {
            selector: '.govuk-error-message',
          }
        );
      });
    });

    it("should show an error message if a disclosure with individual value is selected as Yes and an informed date isn't entered", async () => {
      fireEvent.click(
        screen.getByText('Yes', {
          selector: "[for='disclosedWithIndividual_Yes']",
        })
      );

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Enter a date informed', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if a disclosure with individual value is selected as Yes and an invalid informed date is entered', async () => {
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
        screen.getByText('Must be a valid Date', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if a disclosure with individual value is selected as Yes and an informed date in the future is entered', async () => {
      fireEvent.click(
        screen.getByText('Yes', {
          selector: "[for='disclosedWithIndividual_Yes']",
        })
      );

      setDateFieldValue('disclosedDate', addDays(new Date(), 10));

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText("Date informed can't be in the future", {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if a disclosure with individual value is selected as Yes and no inform method is selected', async () => {
      fireEvent.click(
        screen.getByText('Yes', {
          selector: "[for='disclosedWithIndividual_Yes']",
        })
      );

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Select how the individual was informed', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if a disclosure with individual value is selected as Yes and no details are entered', async () => {
      fireEvent.click(
        screen.getByText('Yes', {
          selector: "[for='disclosedWithIndividual_Yes']",
        })
      );

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Enter details of disclosure to individual', {
          selector: '.govuk-error-message',
        });
      });
    });
  });

  describe('for a childrens resident', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      (PersonView as jest.Mock).mockImplementationOnce(
        createMockedPersonView(mockedChildrensResident)
      );

      renderResult = render(
        <AuthProvider user={mockedUser}>
          <AddWarningNoteForm personId={100} />
        </AuthProvider>
      );
    });

    it('should render the warning notes form', () => {
      expect(renderResult.asFragment()).toMatchSnapshot();
    });

    it("should show an error message if a manager's name is not entered", async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Enter a manager’s name', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if a manager discussion date is not entered', async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Enter a date discussed with manager', {
          selector: '.govuk-error-message',
        });
      });
    });
  });
});
