import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useResident } from 'utils/api/residents';
import { mockedResident } from 'factories/residents';
import InlineEditor from './InlineEditor';

jest.mock('utils/api/residents');
const mockFetch = global as jest.Mocked<typeof global>;

(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    status: 200,
  })
);

const mockMutate = jest.fn();
(useResident as jest.Mock).mockReturnValue({
  data: mockedResident,
  mutate: mockMutate,
});

const mockClose = jest.fn();

describe('InlineEditor', () => {
  it('loads the inline editor and submits changes', async () => {
    mockFetch.fetch.mockResolvedValue({
      status: 200,
      ok: true,
      statusText: '',
      type: 'basic',
      url: '',
      headers: {},
      redirected: false,
    });
    render(
      <InlineEditor
        label="Bar"
        name="firstName"
        value="foo"
        onClose={mockClose}
        resident={mockedResident}
      />
    );

    expect(screen.getByLabelText('Editing firstName'));

    await waitFor(() =>
      fireEvent.change(screen.getByRole('textbox'), {
        target: {
          value: 'example value',
        },
      })
    );
    await waitFor(() => fireEvent.click(screen.getByText('Save')));

    expect(global.fetch).toBeCalledWith(`/api/residents/${mockedResident.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        firstName: 'example value',
      }),
    });
    expect(mockMutate).toBeCalled();
    expect(mockClose).toBeCalled();
  });

  it('responds to the ESC key', () => {
    render(
      <InlineEditor
        label="Bar"
        name="firstName"
        value="foo"
        onClose={mockClose}
        resident={mockedResident}
      />
    );

    fireEvent.keyUp(screen.getByRole('textbox'), { key: 'Escape' });
    expect(mockClose).toBeCalled();
  });

  it('renders a select instead if given options', () => {
    render(
      <InlineEditor
        label="Bar"
        name="firstName"
        value="foo"
        onClose={mockClose}
        resident={mockedResident}
        options={[
          {
            label: 'One',
            value: 1,
          },
          {
            label: 'Two',
            value: 2,
          },
        ]}
      />
    );

    expect(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option').length).toBe(2);
    expect(screen.queryByRole('textbox')).toBeNull();
  });
  describe('Error tests', () => {
    it('loads the inline editor and submits changes', async () => {
      mockFetch.fetch.mockResolvedValue({
        status: 500,
        ok: true,
        statusText: 'This is an error',
        type: 'basic',
        url: '',
        headers: {},
        redirected: false,
      });
      // (global.fetch as jest.Mock).mockImplementationOnce(
      //   jest.fn(() =>
      //     Promise.resolve({
      //       json: () => Promise.resolve({}),
      //       status: 500,
      //       statusText: 'This is an error',
      //     })
      //   )
      // );
      render(
        <InlineEditor
          label="Bar"
          name="firstName"
          value="foo"
          onClose={mockClose}
          resident={mockedResident}
        />
      );

      expect(screen.getByLabelText('Editing firstName'));

      await waitFor(() =>
        fireEvent.change(screen.getByRole('textbox'), {
          target: {
            value: 'example value',
          },
        })
      );
      await waitFor(() => fireEvent.click(screen.getByText('Save')));

      expect(global.fetch).toBeCalled();
      expect(screen.getByRole('alert'));
      expect(screen.getByText('This is an error'));
    });
  });
});
