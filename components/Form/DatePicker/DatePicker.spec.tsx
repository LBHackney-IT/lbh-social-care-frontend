import { screen, render } from '@testing-library/react';
import DatePicker from './DatePicker';

jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01').getTime());

describe('DatePicker', () => {
  it("can render today's date", () => {
    render(<DatePicker label="Date" name="whatever" defaultToday />);

    expect((screen.getByLabelText('Date') as HTMLInputElement).value).toBe(
      '2020-01-01'
    );
  });

  it('renders a blank value by default', () => {
    render(<DatePicker label="Date" name="whatever" />);

    expect(
      (screen.getByLabelText('Date') as HTMLInputElement).value
    ).toBeFalsy();
  });
});
