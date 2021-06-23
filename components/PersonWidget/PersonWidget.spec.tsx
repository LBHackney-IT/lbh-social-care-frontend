import PersonWidget from './PersonWidget';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

describe('PersonWidget', () => {
  it('should render properly', () => {
    const resident = residentFactory.build();
    const { asFragment } = render(<PersonWidget person={resident} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when there is a person', () => {
    const resident = residentFactory.build();

    const { getByText, queryByText } = render(
      <PersonWidget person={resident} />
    );

    expect(getByText('Foo Bar'));
    expect(getByText('Born 13 Nov 2020'));
    expect(queryByText('FLAT 10, GEORGE LEYBOURNE HOUSE, FLETCHER STREET'));
    expect(queryByText('E1 8HW'));
  });

  it('renders correctly when there is no person', () => {
    const { getByText } = render(<PersonWidget />);

    expect(getByText('Person not found'));
  });

  it('should handle when there is no date of birth', () => {
    const resident = residentFactory.build();
    resident.dateOfBirth = '';

    const { queryByText } = render(<PersonWidget person={resident} />);

    expect(queryByText('Born')).toBeNull();
  });

  it('should handle when there is an invalid date of birth', () => {
    const resident = residentFactory.build();
    resident.dateOfBirth = 'this is not a date';

    const { getByText, queryByText } = render(
      <PersonWidget person={resident} />
    );

    expect(getByText('Foo Bar'));
    expect(queryByText('Born')).toBeNull();
  });

  it('should handle when there is no address', () => {
    const resident = residentFactory.build();
    resident.addresses = [];

    const { queryByText } = render(<PersonWidget person={resident} />);

    expect(
      queryByText('FLAT 10, GEORGE LEYBOURNE HOUSE, FLETCHER STREET')
    ).toBeNull();
  });
});
