import { mockedResident } from 'factories/residents';
import { fireEvent, render, screen } from '@testing-library/react';
import Mapping from './Mapping';
import { useResident } from 'utils/api/residents';

jest.mock('utils/api/residents');

(useResident as jest.Mock).mockReturnValue({
  data: mockedResident,
});

describe('Mapping', () => {
  it('can tab between street view and map', () => {
    render(<Mapping socialCareId={1} />);

    fireEvent.click(screen.getByText('Street view'));
    expect(
      screen
        .getAllByTestId('panel')[0]
        .classList.contains('govuk-tabs__panel--hidden')
    );
    fireEvent.click(screen.getByText('Map'));
    expect(
      screen
        .getAllByTestId('panel')[1]
        .classList.contains('govuk-tabs__panel--hidden')
    );
  });

  it('shows a street view and map', () => {
    render(<Mapping socialCareId={1} />);
    expect((screen.getAllByRole('img')[0] as HTMLImageElement).src).toContain(
      'https://maps.googleapis.com/maps/api/staticmap?size=360x360&return_error_code=true&markers=sjakdjlk,%20hdsadjk&zoom=15'
    );
    expect((screen.getAllByRole('img')[1] as HTMLImageElement).src).toContain(
      'https://maps.googleapis.com/maps/api/streetview?size=360x360&return_error_code=true&location=sjakdjlk,%20hdsadjk'
    );
  });
});
