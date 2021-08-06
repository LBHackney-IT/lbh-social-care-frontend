import PersonWidget from './PersonWidget';
import { render, fireEvent } from '@testing-library/react';
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

  it('should return the last address if there are multiple addresses saved on the person', () => {
    const firstAddress = {
      addressLines: '100 Example Street',
      postCode: 'E1 8HW',
    };

    const newAddress = {
      addressLines: '123 TestCode Lane',
      postCode: 'SE1 7DT',
    };

    const resident = residentFactory.build();
    resident.addresses = [firstAddress, newAddress];

    const { getByTestId, asFragment } = render(
      <PersonWidget person={resident} />
    );

    expect(getByTestId('resident-last-address')).toHaveTextContent(
      '123 TestCode Lane'
    );
    expect(getByTestId('resident-last-address')).toHaveTextContent('SE1 7DT');

    expect(getByTestId('resident-last-address')).not.toHaveTextContent(
      '100 Example Street'
    );

    expect(getByTestId('resident-last-address')).not.toHaveTextContent(
      'E1 8HW'
    );
  });

  it('should call the setOpen callback with the id of the selected resident if the widget is not open', () => {
    const resident = residentFactory.build();
    const mockSetOpen = jest.fn();

    const index = 1;

    const { container } = render(
      <PersonWidget
        person={resident}
        grouped={true}
        onRemove={jest.fn()}
        index={index}
        open={false}
        setOpen={mockSetOpen}
      />
    );

    const input = container.querySelector('summary');
    input && fireEvent.click(input);

    expect(mockSetOpen).toBeCalledWith(index);
  });

  it('should call the setOpen callback with false when closing a widget', () => {
    const resident = residentFactory.build();
    const mockSetOpen = jest.fn();

    const { container } = render(
      <PersonWidget
        person={resident}
        grouped={true}
        onRemove={jest.fn()}
        index={1}
        open={true}
        setOpen={mockSetOpen}
      />
    );

    const input = container.querySelector('summary');
    input && fireEvent.click(input);

    expect(mockSetOpen).toBeCalledWith(false);
  });

  it('should call the onRemove callback with the id of the resident', () => {
    const resident = residentFactory.build();
    const mockRemove = jest.fn();

    const index = 1;

    const { queryByText } = render(
      <PersonWidget
        person={resident}
        grouped={true}
        onRemove={mockRemove}
        index={index}
        open={false}
        setOpen={jest.fn()}
      />
    );

    const removeButton = queryByText('Remove');
    removeButton && fireEvent.click(removeButton);

    expect(mockRemove).toBeCalledWith(resident.id);
  });

  // calling onRemove
});
