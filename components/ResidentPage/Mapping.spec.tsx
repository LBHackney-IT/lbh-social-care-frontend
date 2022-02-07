import { mockedResident } from 'factories/residents';
import { render, screen } from '@testing-library/react';
import Mapping from './Mapping';

describe('Mapping', () => {
  it('shows street view and map', () => {
    render(<Mapping resident={mockedResident} />);
    expect((screen.getAllByRole('img')[0] as HTMLImageElement).src).toContain(
      'https://maps.googleapis.com/maps/api/streetview?size=300x300&return_error_code=true&location=sjakdjlk,%20hdsadjk'
    );
    expect((screen.getAllByRole('img')[1] as HTMLImageElement).src).toContain(
      'https://maps.googleapis.com/maps/api/staticmap?size=300x300&return_error_code=true&markers=sjakdjlk,%20hdsadjk&zoom=15'
    );
  });
});
