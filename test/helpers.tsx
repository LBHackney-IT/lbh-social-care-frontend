import { fireEvent, screen } from '@testing-library/react';

import { Resident } from '../types';

/**
 * Creates a mocked `<PersonView>` which our component is wrapped in internally
 *
 * @param {Resident} resident The resident to use for this <PersonView />
 *
 * @example
 *    createMockedPersonView(residentFactory.build());
 */
export const createMockedPersonView = (resident: Resident) => {
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
export const setDateFieldValue = (
  fieldName: string,
  date: Date | { date: string; month: string; year: string }
): void => {
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
