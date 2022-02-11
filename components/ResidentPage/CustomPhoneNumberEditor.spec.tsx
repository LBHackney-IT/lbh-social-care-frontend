import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import CustomPhoneNumberEditor from './CustomPhoneNumberEditor';

const mockClose = jest.fn();

jest.mock('axios');

(global.fetch as jest.Mock) = jest.fn(() => ({
  status: 200,
}));

describe('CustomPhoneNumberEditor', () => {
  it('can be closed correctly', () => {
    render(
      <CustomPhoneNumberEditor
        onClose={mockClose}
        resident={mockedResident}
        label="Phone numbers"
        name="phoneNumbers"
      />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockClose).toBeCalled();
  });

  it('responds to the ESC key', () => {
    render(
      <CustomPhoneNumberEditor
        onClose={mockClose}
        resident={mockedResident}
        label="Phone numbers"
        name="phoneNumbers"
      />
    );

    fireEvent.keyUp(screen.getByRole('group'), { key: 'Escape' });
    expect(mockClose).toBeCalled();
  });

  it('shows an existing phone number if set', () => {
    render(
      <CustomPhoneNumberEditor
        onClose={mockClose}
        resident={{
          ...mockedResident,
          phoneNumbers: [
            {
              type: 'Foo',
              number: '07777',
            },
          ],
        }}
        label="Phone numbers"
        name="phoneNumbers"
      />
    );

    expect(screen.getByDisplayValue('Foo'));
    expect(screen.getByDisplayValue('07777'));
  });

  it('shows empty initial fields if not', () => {
    render(
      <CustomPhoneNumberEditor
        onClose={mockClose}
        resident={mockedResident}
        label="Phone numbers"
        name="phoneNumbers"
      />
    );
    expect(screen.getAllByRole('textbox').length).toBe(1);
    expect(screen.getAllByRole('combobox').length).toBe(1);
    expect(screen.getAllByText('Remove').length).toBe(1);
    expect(screen.getByText('+ Add another'));
  });

  it('allows the first number to be removed', () => {
    render(
      <CustomPhoneNumberEditor
        onClose={mockClose}
        resident={mockedResident}
        label="Phone numbers"
        name="phoneNumbers"
      />
    );
    fireEvent.click(screen.getByText('Remove'));
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.queryByRole('combobox')).toBeNull();
    expect(screen.queryByText('Remove')).toBeNull();
    expect(screen.getByText('+ Add first phone number'));
  });

  it('allows multiple numbers to be added', async () => {
    render(
      <CustomPhoneNumberEditor
        onClose={mockClose}
        resident={mockedResident}
        label="Phone numbers"
        name="phoneNumbers"
      />
    );
    fireEvent.change(screen.getByLabelText('Label'), {
      target: { value: 'Foo' },
    });
    fireEvent.change(screen.getByLabelText('Number'), {
      target: { value: 'Bar' },
    });
    fireEvent.click(screen.getByText('+ Add another'));
    fireEvent.change(screen.getAllByLabelText('Label')[1], {
      target: { value: 'One' },
    });
    fireEvent.change(screen.getAllByLabelText('Number')[1], {
      target: { value: 'Two' },
    });
  });

  it('saves correctly', async () => {
    render(
      <CustomPhoneNumberEditor
        onClose={mockClose}
        resident={mockedResident}
        label="Phone numbers"
        name="phoneNumbers"
      />
    );
    fireEvent.change(screen.getByLabelText('Label'), {
      target: { value: 'One' },
    });
    fireEvent.change(screen.getByLabelText('Number'), {
      target: { value: '0777' },
    });
    await waitFor(() => fireEvent.click(screen.getByText('Save')));

    expect(global.fetch).toBeCalledWith('/api/residents/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...mockedResident,
        phoneNumbers: [
          {
            type: 'One',
            number: '0777',
          },
        ],
      }),
    });
  });
});
