import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { addYears, subMonths, subDays, addMonths, addDays } from 'date-fns';
import Router from 'next/router';

import { residentFactory } from 'factories/residents';
import { ReviewWarningNoteForm } from './ReviewWarningNoteForm';
import PersonView from '../../PersonView/PersonView';
import { AuthProvider } from '../../UserContext/UserContext';
import { mockedUser } from '../../../factories/users';
import {
  createMockedPersonView,
  setDateFieldValue,
} from '../../../test/helpers';
import * as warningNotes from '../../../utils/api/warningNotes';
import { mockedWarningNote } from '../../../factories/warningNotes';

jest.mock('../../PersonView/PersonView');
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
    asPath: 'path',
    replace: jest.fn(),
    pathname: 'foopath',
  }),
}));
jest.mock('../../../utils/api/warningNotes');

const mockedAdultsResident = residentFactory.build({
  contextFlag: 'A',
});

const mockedChildrensResident = residentFactory.build({
  contextFlag: 'C',
});

describe('<ReviewWarningNoteForm />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('for any resident (adults or childrens)', () => {
    beforeEach(() => {
      (PersonView as jest.Mock).mockImplementation(
        createMockedPersonView(mockedAdultsResident)
      );

      jest.spyOn(warningNotes, 'useWarningNote').mockImplementation(() => ({
        data: mockedWarningNote[0],
        mutate: jest.fn(),
        revalidate: jest.fn(),
        isValidating: false,
      }));

      render(
        <AuthProvider user={mockedUser}>
          <ReviewWarningNoteForm personId={100} warningNoteId={10} />
        </AuthProvider>
      );
    });

    it('should show an error message if a review date is not entered', async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Enter a date review undertaken', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if the review date entered is in the future', async () => {
      setDateFieldValue('reviewDate', addYears(new Date(), 2));

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText("Date review undertaken can't be in the future", {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if an invalid review date is entered', async () => {
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

    it('should show an error message if review details are not entered', async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Enter details of review', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if the manager discussion date entered is in the future', async () => {
      setDateFieldValue('discussedWithManagerDate', addYears(new Date(), 2));

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText("Date discussed with manager can't be in the future", {
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

    it('should show an error message if a next step is not selected', async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Select what you want to do', {
          selector: '.govuk-error-message',
        });
      });
    });

    it("should show an error message if the next step is selected as Renew and a next review date isn't entered", async () => {
      fireEvent.click(
        screen.getByText('Renew Warning Note', {
          selector: "[for='reviewDecision_Yes']",
        })
      );

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Enter a next review date', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if the next step is selected as Renew and a next review date in the past is entered', async () => {
      fireEvent.click(
        screen.getByText('Renew Warning Note', {
          selector: "[for='reviewDecision_Yes']",
        })
      );

      setDateFieldValue('nextReviewDate', subMonths(new Date(), 2));

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText('Next review date cannot be earlier than today.', {
          selector: '.govuk-error-message',
        });
      });
    });

    it('should show an error message if the next step is selected as Renew and a next review date more than one year after the date review undertaken', async () => {
      fireEvent.click(
        screen.getByText('Renew Warning Note', {
          selector: "[for='reviewDecision_Yes']",
        })
      );

      setDateFieldValue('reviewDate', subDays(new Date(), 1)); // Yesterday
      setDateFieldValue('nextReviewDate', addDays(addYears(new Date(), 1), 1)); // One year and one day later

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        screen.getByText(
          'Next review date cannot be more than 1 year from date review undertaken.',
          {
            selector: '.govuk-error-message',
          }
        );
      });
    });

    describe('when the form is submitted with valid data', () => {
      it('should push to the summary route to renew a warning note', async () => {
        // Review date
        setDateFieldValue('reviewDate', new Date());

        // Discussed with individual
        fireEvent.click(
          screen.getByText('Yes', {
            selector: "[for='disclosedWithIndividual_Yes']",
          })
        );

        // Details of review
        fireEvent.change(screen.getByLabelText(/Details of review/), {
          target: {
            value: 'Some details',
          },
        });

        // Manager's name
        fireEvent.change(screen.getByLabelText(/Manager’s name/), {
          target: {
            value: 'First Last',
          },
        });

        // Date discussed with manager
        setDateFieldValue('discussedWithManagerDate', new Date());

        // Renew warning note
        fireEvent.click(
          screen.getByText('Renew Warning Note', {
            selector: "[for='reviewDecision_Yes']",
          })
        );

        // Next review date
        setDateFieldValue('nextReviewDate', addMonths(new Date(), 11));

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
          expect(Router.push).toHaveBeenCalledWith(
            expect.objectContaining({
              pathname: '/people/100/warning-notes/10/summary',
            })
          );
        });
      });

      it('should push to the summary route to end a warning note', async () => {
        // Review date
        setDateFieldValue('reviewDate', new Date());

        // Discussed with individual
        fireEvent.click(
          screen.getByText('Yes', {
            selector: "[for='disclosedWithIndividual_Yes']",
          })
        );

        // Details of review
        fireEvent.change(screen.getByLabelText(/Details of review/), {
          target: {
            value: 'Some details',
          },
        });

        // Manager's name
        fireEvent.change(screen.getByLabelText(/Manager’s name/), {
          target: {
            value: 'First Last',
          },
        });

        // Date discussed with manager
        setDateFieldValue('discussedWithManagerDate', new Date());

        // End warning note
        fireEvent.click(
          screen.getByText('End Warning Note', {
            selector: "[for='reviewDecision_No']",
          })
        );

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
          expect(Router.push).toHaveBeenCalledWith(
            expect.objectContaining({
              pathname: '/people/100/warning-notes/10/summary',
            })
          );
        });
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
      (PersonView as jest.Mock).mockImplementation(
        createMockedPersonView(mockedAdultsResident)
      );

      jest.spyOn(warningNotes, 'useWarningNote').mockImplementation(() => ({
        data: mockedWarningNote[0],
        mutate: jest.fn(),
        revalidate: jest.fn(),
        isValidating: false,
      }));

      renderResult = render(
        <AuthProvider user={mockedUser}>
          <ReviewWarningNoteForm personId={100} warningNoteId={10} />
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

    it("should NOT show an error message if a manager's name is not entered", async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        expect(
          screen.queryByText('Enter a manager’s name', {
            selector: '.govuk-error-message',
          })
        ).toBeNull();
      });
    });

    it('should NOT show an error message if a manager discussion date is not entered', async () => {
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        expect(
          screen.queryByText('Enter a date discussed with manager', {
            selector: '.govuk-error-message',
          })
        ).toBeNull();
      });
    });
  });

  describe('for a childrens resident', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      (PersonView as jest.Mock).mockImplementation(
        createMockedPersonView(mockedChildrensResident)
      );

      jest.spyOn(warningNotes, 'useWarningNote').mockImplementation(() => ({
        data: mockedWarningNote[0],
        mutate: jest.fn(),
        revalidate: jest.fn(),
        isValidating: false,
      }));

      renderResult = render(
        <AuthProvider user={mockedUser}>
          <ReviewWarningNoteForm personId={100} warningNoteId={10} />
        </AuthProvider>
      );
    });

    it('should render the warning notes form', () => {
      expect(renderResult.asFragment()).toMatchSnapshot();
    });
  });
});
