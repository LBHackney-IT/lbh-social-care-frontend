import { render, fireEvent } from '@testing-library/react';
import Nationality from './Nationality';

describe('Nationality component', () => {
  const props = {
    label: 'Bar',
    name: 'nationality',
  };

  it('should render properly', () => {
    const { getAllByRole, getByTestId } = render(<Nationality {...props} />);

    expect(getByTestId('nationality')).toBeInTheDocument();
    expect(getAllByRole('option')).toHaveLength(195);
  });

  it('should handle nationality option', () => {
    const { getByText, getByTestId } = render(<Nationality {...props} />);

    fireEvent.change(getByTestId('nationality'), {
      target: { value: 'Afghan' },
    });

    expect(getByText('Afghan').selected).toBeTruthy();
    expect(getByText('Albanian').selected).toBeFalsy();
  });
});
